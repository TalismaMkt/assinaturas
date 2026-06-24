import { withSupabase } from "@supabase/server";

type CsvRow = {
  first_name: string;
  last_name: string;
  role: string;
  phone: string;
  email: string;
  template_id?: string | null;
};

function parseCSVLine(line: string) {
  const result: string[] = [];
  let current = "";
  let insideQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const next = line[i + 1];

    if (char === '"') {
      if (insideQuotes && next === '"') {
        current += '"';
        i++;
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === "," && !insideQuotes) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }

  result.push(current);
  return result.map((item) => item.trim());
}

function parseCSV(text: string) {
  const lines = text.replace(/\r/g, "").split("\n").filter(Boolean);
  if (lines.length < 2) return { headers: [], rows: [] as Record<string, string>[] };

  const headers = parseCSVLine(lines[0]);
  const rows = lines.slice(1).map((line) => {
    const values = parseCSVLine(line);
    const row: Record<string, string> = {};
    headers.forEach((header, index) => {
      row[header] = values[index] || "";
    });
    return row;
  });

  return { headers, rows };
}

function validateCsv(headers: string[], rows: Record<string, string>[]) {
  const required = ["firstName", "lastName", "role", "phone", "email"];
  const missing = required.filter((h) => !headers.includes(h));
  const rowErrors: string[] = [];

  rows.forEach((row, idx) => {
    const missingFields = required.filter((h) => !(row[h] || "").trim());
    if (missingFields.length) {
      rowErrors.push(`Linha ${idx + 2}: faltando ${missingFields.join(", ")}`);
    }
  });

  return { missing, rowErrors };
}

export const dynamic = "force-dynamic";

export const POST = withSupabase({ auth: "none" }, async (req, ctx) => {
  try {
    const { csvUrl, template_id } = await req.json();

    if (!csvUrl || typeof csvUrl !== "string") {
      return Response.json({ ok: false, error: "Informe uma URL CSV válida." }, { status: 400 });
    }

    const response = await fetch(csvUrl, {
      cache: "no-store",
      headers: {
        Accept: "text/csv,text/plain;q=0.9,*/*;q=0.8",
      },
    });

    if (!response.ok) {
      return Response.json(
        { ok: false, error: `Falha ao buscar CSV: HTTP ${response.status}` },
        { status: 400 }
      );
    }

    const text = await response.text();
    const parsed = parseCSV(text);
    const validation = validateCsv(parsed.headers, parsed.rows);

    if (validation.missing.length) {
      return Response.json(
        { ok: false, error: `CSV inválido. Colunas obrigatórias ausentes: ${validation.missing.join(", ")}.` },
        { status: 400 }
      );
    }

    if (validation.rowErrors.length) {
      return Response.json(
        {
          ok: false,
          error: `CSV com erro: ${validation.rowErrors.slice(0, 3).join(" | ")}${validation.rowErrors.length > 3 ? " ..." : ""}`,
        },
        { status: 400 }
      );
    }

    const rows: CsvRow[] = parsed.rows.map((row) => ({
      first_name: row.firstName,
      last_name: row.lastName,
      role: row.role,
      phone: row.phone,
      email: row.email,
      template_id: template_id ?? null,
    }));

    const admin = ctx.supabaseAdmin;
    const { data, error } = await admin
      .from("signature_profiles")
      .upsert(rows as never[], { onConflict: "email" })
      .select();

    if (error) {
      return Response.json({ ok: false, error: error.message }, { status: 500 });
    }

    return Response.json({ ok: true, count: rows.length, data });
  } catch (error) {
    return Response.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Erro desconhecido ao importar CSV.",
      },
      { status: 500 }
    );
  }
});
