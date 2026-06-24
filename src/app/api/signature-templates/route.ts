import { withSupabase } from "@supabase/server";

type SignatureTemplateRow = {
  id?: string;
  name: string;
  company_name?: string | null;
  site?: string | null;
  site_label?: string | null;
  address?: string | null;
  linkedin?: string | null;
  facebook?: string | null;
  instagram?: string | null;
  whatsapp?: string | null;
  youtube?: string | null;
  tiktok?: string | null;
  logo_url?: string | null;
  certificate_url?: string | null;
  settings?: Record<string, unknown>;
  created_at?: string;
  updated_at?: string;
};

export const dynamic = "force-dynamic";

export const GET = withSupabase({ auth: "none" }, async (_req, ctx) => {
  const admin = ctx.supabaseAdmin;
  const { data, error } = await admin
    .from("signature_templates")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    return Response.json({ ok: false, error: error.message }, { status: 500 });
  }

  return Response.json({ ok: true, data });
});

export const POST = withSupabase({ auth: "none" }, async (req, ctx) => {
  const body = (await req.json()) as SignatureTemplateRow;
  const admin = ctx.supabaseAdmin;

  const { data, error } = await admin
    .from("signature_templates")
    .upsert(body as never, { onConflict: "name" })
    .select()
    .single();

  if (error) {
    return Response.json({ ok: false, error: error.message }, { status: 500 });
  }

  return Response.json({ ok: true, data });
});
