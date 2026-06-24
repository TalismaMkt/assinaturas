"use client";

import { useEffect, useMemo, useState } from "react";

type Profile = {
  id?: string;
  first_name: string;
  last_name: string;
  role: string;
  phone: string;
  email: string;
  template_id?: string | null;
};

type Template = {
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
  settings?: {
    nameSize?: number;
    roleSize?: number;
    emailSize?: number;
    phoneSize?: number;
    addressSize?: number;
    siteLabelSize?: number;
    [key: string]: unknown;
  };
};

const ICONS = {
  email: "/assets/icons/e-mail.svg",
  phone: "/assets/icons/whatsapp1.svg",
  address: "/assets/icons/Endereco.svg",
  logo: "/assets/icons/Logotipo talisma.png",
  linkedin: "/assets/icons/Linkedin.svg",
  facebook: "/assets/icons/FAcebook.svg",
  instagram: "/assets/icons/Instagram.svg",
  whatsapp: "/assets/icons/Whatsapp.svg",
  youtube: "/assets/icons/Youtube.svg",
  site: "/assets/icons/Site.svg",
  tiktok: "/assets/icons/Tiktok.svg",
  certificate: "/assets/icons/certificado.png",
};

const defaultProfile: Profile = {
  first_name: "Camila",
  last_name: "Santos",
  role: "Auxiliar administrativo",
  phone: "17 99641-9074",
  email: "aux01.recepcao@talismaseguros.com",
};

const defaultTemplate: Template = {
  name: "default",
  company_name: "Talismã Seguros",
  site: "https://www.talismaseguros.com",
  site_label: "gente cuidando de gente!",
  address: "RUA JORGE TIBIRIÇA, 2.474 BOA VISTA, na cidade de São José do Rio Preto/SP. (CEP. 1510-050)",
  linkedin: "https://www.linkedin.com/company/talismaseguros",
  facebook: "https://www.facebook.com/talismaseguros",
  instagram: "https://www.instagram.com/talismaseguros",
  whatsapp: "https://wa.me/5517996419074",
  youtube: "https://www.youtube.com",
  tiktok: "https://www.tiktok.com",
  logo_url: ICONS.logo,
  certificate_url: ICONS.certificate,
  settings: {},
};

const CSV_SAMPLE = `firstName,lastName,role,phone,email\nCamila,Santos,Auxiliar administrativo,17 99641-9074,aux01.recepcao@talismaseguros.com`;

function esc(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

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
      } else insideQuotes = !insideQuotes;
    } else if (char === ',' && !insideQuotes) {
      result.push(current);
      current = "";
    } else current += char;
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
    headers.forEach((header, index) => (row[header] = values[index] || ""));
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
    if (missingFields.length) rowErrors.push(`Linha ${idx + 2}: faltando ${missingFields.join(", ")}`);
  });
  return { missing, rowErrors };
}

function buildSignatureHtml(profile: Profile, template: Template) {
  const settings = {
    nameSize: Number(template.settings?.nameSize ?? 19),
    roleSize: Number(template.settings?.roleSize ?? 11.26),
    emailSize: Number(template.settings?.emailSize ?? 16),
    phoneSize: Number(template.settings?.phoneSize ?? 16),
    addressSize: Number(template.settings?.addressSize ?? 9),
    siteLabelSize: Number(template.settings?.siteLabelSize ?? 10.09),
  };

  return `
<div style="width:100%;height:100%;padding-top:22.59px;padding-bottom:19.48px;padding-left:30px;padding-right:21.04px;background:#F7F7F7;display:inline-flex;flex-direction:column;justify-content:flex-end;align-items:flex-start;gap:14px;font-family:Arial,Helvetica,sans-serif;">
 <div style="width:738px;height:91px;display:inline-flex;justify-content:flex-start;align-items:flex-start;gap:11px;">
  <div style="width:214px;padding-top:8px;padding-bottom:8px;display:inline-flex;flex-direction:column;justify-content:center;align-items:flex-start;">
   <div style="align-self:stretch;display:block;color:#26478A;font-size:19px;font-family:Arial,Helvetica,sans-serif;font-weight:900;text-transform:capitalize;line-height:28.83px;white-space:normal;word-break:normal;overflow-wrap:break-word;">${esc(`${profile.first_name} ${profile.last_name}`.trim())}</div>
   <div style="align-self:stretch;display:flex;flex-direction:column;color:#8CC63F;font-size:11.26px;font-family:Arial,Helvetica,sans-serif;font-weight:400;text-transform:uppercase;line-height:17.57px;letter-spacing:0.34px;word-wrap:break-word;">${esc(profile.role)}</div>
  </div>
  <div style="width:404px;height:96px;display:inline-flex;flex-direction:column;justify-content:flex-start;align-items:flex-start;gap:0.78px;">
   <div style="min-height:26px;justify-content:flex-start;align-items:center;gap:9.35px;display:flex;width:100%;"><div style="width:30px;min-width:30px;display:flex;justify-content:flex-start;align-items:center;"><img src="${ICONS.email}" style="width:24px;height:24px;display:block;object-fit:contain;" /></div><div style="width:314px;display:flex;align-items:center;color:#666666;font-size:16px;font-family:Arial,Helvetica,sans-serif;font-weight:400;text-transform:lowercase;line-height:30.38px;letter-spacing:0.48px;word-wrap:break-word;">${esc(profile.email)}</div></div>
   <div style="min-height:26px;justify-content:flex-start;align-items:center;gap:9.35px;display:flex;width:100%;"><div style="width:30px;min-width:30px;display:flex;justify-content:flex-start;align-items:center;"><img src="${ICONS.phone}" style="width:25px;height:25px;display:block;object-fit:contain;" /></div><div style="width:117px;display:flex;align-items:center;color:#666666;font-size:16px;font-family:Arial,Helvetica,sans-serif;font-weight:400;text-transform:uppercase;line-height:30.38px;letter-spacing:0.48px;word-wrap:break-word;">${esc(profile.phone)}</div></div>
   <div style="min-height:26px;justify-content:flex-start;align-items:center;gap:9.35px;display:flex;width:100%;"><div style="width:30px;min-width:30px;display:flex;justify-content:flex-start;align-items:center;"><img src="${ICONS.address}" style="width:24px;height:24px;display:block;object-fit:contain;" /></div><div style="width:441.23px;color:#666666;font-size:9px;font-family:Arial,Helvetica,sans-serif;font-weight:400;text-transform:uppercase;line-height:17px;letter-spacing:0.27px;word-wrap:break-word;">${esc(template.address || "")}</div></div>
  </div>
 </div>
 <div style="width:738px;height:80px;padding-left:16px;padding-right:16px;background:#EBEBEB;border-radius:10px;justify-content:flex-start;align-items:center;gap:35px;display:inline-flex;">
  <img style="width:125px;height:auto;display:block;" src="${esc(template.logo_url || ICONS.logo)}" />
  <div style="width:180.65px;height:20.17px;justify-content:center;align-items:center;gap:8.57px;display:flex;"><div style="width:282.20px;text-align:center;color:#26478A;font-size:10.09px;font-family:Arial,Helvetica,sans-serif;font-weight:400;text-transform:uppercase;line-height:27.86px;letter-spacing:0.81px;word-wrap:break-word;">${esc(template.site_label || "")}</div></div>
  <div style="width:204.13px;min-height:19px;justify-content:space-between;align-items:center;display:flex;gap:8px;flex-wrap:wrap;">
    <a href="${esc(template.linkedin || "#")}" target="_blank"><img src="${ICONS.linkedin}" width="19" height="19" style="display:block;" /></a>
    <a href="${esc(template.facebook || "#")}" target="_blank"><img src="${ICONS.facebook}" width="19" height="19" style="display:block;" /></a>
    <a href="${esc(template.instagram || "#")}" target="_blank"><img src="${ICONS.instagram}" width="19" height="19" style="display:block;" /></a>
    <a href="${esc(template.whatsapp || "#")}" target="_blank"><img src="${ICONS.whatsapp}" width="19" height="19" style="display:block;" /></a>
    <a href="${esc(template.youtube || "#")}" target="_blank"><img src="${ICONS.youtube}" width="19" height="19" style="display:block;" /></a>
    <a href="${esc(template.site || "#")}" target="_blank"><img src="${ICONS.site}" width="19" height="19" style="display:block;" /></a>
    <a href="${esc(template.tiktok || "#")}" target="_blank"><img src="${ICONS.tiktok}" width="19" height="19" style="display:block;" /></a>
  </div>
  <img style="width:82px;height:116px;display:block;object-fit:cover;" src="${esc(template.certificate_url || ICONS.certificate)}" />
 </div>
</div>`.trim();
}

export default function Home() {
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [template, setTemplate] = useState<Template>(defaultTemplate);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [csvUrl, setCsvUrl] = useState("https://docs.google.com/spreadsheets/d/1x5Rm52PVF467IKFlyT6rnCbyDQHNBG19H-KBmRHtzic/export?format=csv&gid=1061523597");
  const [status, setStatus] = useState("");
  const [bulkStatus, setBulkStatus] = useState("");
  const [copyFallback, setCopyFallback] = useState("");
  const [lastImportedEmails, setLastImportedEmails] = useState<string[]>([]);

  const currentProfileIndex = useMemo(() => profiles.findIndex((item) => item.email === profile.email), [profiles, profile.email]);
  const html = useMemo(() => buildSignatureHtml(profile, template), [profile, template]);

  useEffect(() => {
    setCopyFallback(html);
  }, [html]);

  useEffect(() => {
    loadTemplates();
    loadProfiles();
  }, []);

  async function loadTemplates() {
    try {
      const res = await fetch("/api/signature-templates", { cache: "no-store" });
      const json = await res.json();
      if (json.ok && json.data?.length) {
        const found = json.data.find((item: Template) => item.name === "default") || json.data[0];
        setTemplate((prev) => ({ ...prev, ...found }));
      }
    } catch {}
  }

  async function loadProfiles() {
    try {
      const res = await fetch("/api/signature-profiles", { cache: "no-store" });
      const json = await res.json();
      if (json.ok && Array.isArray(json.data)) setProfiles(json.data);
    } catch {}
  }

  async function saveTemplate() {
    setStatus("Salvando template...");
    const res = await fetch("/api/signature-templates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(template),
    });
    const text = await res.text();
    setStatus(res.ok ? "Template salvo." : `Falha ao salvar template: ${text}`);
  }

  async function saveProfile() {
    setStatus("Salvando perfil...");
    const payload = { ...profile, template_id: template.id ?? null };
    const res = await fetch("/api/signature-profiles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const text = await res.text();
    if (res.ok) {
      setStatus("Perfil salvo.");
      loadProfiles();
    } else {
      setStatus(`Falha ao salvar perfil: ${text}`);
    }
  }

  async function importCsvText(text: string) {
    const parsed = parseCSV(text);
    const validation = validateCsv(parsed.headers, parsed.rows);

    if (validation.missing.length) {
      setBulkStatus(`CSV inválido. Colunas obrigatórias ausentes: ${validation.missing.join(", ")}.`);
      return;
    }

    if (validation.rowErrors.length) {
      setBulkStatus(`CSV com erro: ${validation.rowErrors.slice(0, 3).join(" | ")}${validation.rowErrors.length > 3 ? " ..." : ""}`);
      return;
    }

    const rows: Profile[] = parsed.rows.map((row) => ({
      first_name: row.firstName,
      last_name: row.lastName,
      role: row.role,
      phone: row.phone,
      email: row.email,
      template_id: template.id ?? null,
    }));

    setBulkStatus(`CSV lido com ${rows.length} linha(s). Salvando no Supabase...`);

    const res = await fetch("/api/signature-profiles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rows),
    });

    const json = await res.json().catch(() => null);

    if (res.ok && json?.ok) {
      await loadProfiles();
      if (rows[0]) setProfile(rows[0]);
      setLastImportedEmails(rows.map((row) => row.email));
      setBulkStatus(`${rows.length} perfil(is) importado(s) e salvo(s) com sucesso.`);
    } else {
      setBulkStatus(`Falha ao importar: ${json?.error || res.statusText || "erro desconhecido"}`);
    }
  }

  function goToProfile(direction: "prev" | "next") {
    if (!profiles.length) return;
    const current = currentProfileIndex >= 0 ? currentProfileIndex : 0;
    const nextIndex = direction === "prev" ? (current - 1 + profiles.length) % profiles.length : (current + 1) % profiles.length;
    setProfile(profiles[nextIndex]);
  }

  async function copyText(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("HTML copiado.");
    } catch {
      setStatus("Não consegui copiar automaticamente. Use o campo de backup.");
    }
  }

  return (
    <main className="min-h-screen bg-[#f5f7fb] px-4 py-6 text-slate-900 lg:px-6">
      <div className="mx-auto w-[98vw] max-w-[1900px]">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Gerador de Assinatura Talismã</h1>
          <p className="mt-2 text-sm text-slate-500">Migrado para Next + Supabase para persistir templates e perfis.</p>
        </div>

        <section className="grid gap-6 lg:grid-cols-[620px_minmax(0,1fr)]">
          <div className="rounded-[18px] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Dados da assinatura</h2>
            <div className="mt-4 grid gap-4">
              <div className="grid gap-3 md:grid-cols-2">
                <label className="text-sm"><span className="mb-1 block font-medium">Primeiro nome</span><input value={profile.first_name} onChange={(e) => setProfile((p) => ({ ...p, first_name: e.target.value }))} className="w-full rounded-xl border border-slate-200 px-3 py-3" /></label>
                <label className="text-sm"><span className="mb-1 block font-medium">Sobrenome</span><input value={profile.last_name} onChange={(e) => setProfile((p) => ({ ...p, last_name: e.target.value }))} className="w-full rounded-xl border border-slate-200 px-3 py-3" /></label>
              </div>
              <label className="text-sm"><span className="mb-1 block font-medium">Cargo</span><input value={profile.role} onChange={(e) => setProfile((p) => ({ ...p, role: e.target.value }))} className="w-full rounded-xl border border-slate-200 px-3 py-3" /></label>
              <label className="text-sm"><span className="mb-1 block font-medium">Telefone</span><input value={profile.phone} onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))} className="w-full rounded-xl border border-slate-200 px-3 py-3" /></label>
              <label className="text-sm"><span className="mb-1 block font-medium">E-mail</span><input value={profile.email} onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))} className="w-full rounded-xl border border-slate-200 px-3 py-3" /></label>
            </div>

            <div className="mt-6 border-t border-slate-200 pt-6">
              <h3 className="text-lg font-semibold">Template persistente</h3>
              <div className="mt-4 grid gap-4">
                <label className="text-sm"><span className="mb-1 block font-medium">Nome do template</span><input value={template.name || "default"} onChange={(e) => setTemplate((t) => ({ ...t, name: e.target.value }))} className="w-full rounded-xl border border-slate-200 px-3 py-3" /></label>
                <label className="text-sm"><span className="mb-1 block font-medium">Frase central</span><input value={template.site_label || ""} onChange={(e) => setTemplate((t) => ({ ...t, site_label: e.target.value }))} className="w-full rounded-xl border border-slate-200 px-3 py-3" /></label>
                <label className="text-sm"><span className="mb-1 block font-medium">Endereço</span><input value={template.address || ""} onChange={(e) => setTemplate((t) => ({ ...t, address: e.target.value }))} className="w-full rounded-xl border border-slate-200 px-3 py-3" /></label>
                <div className="grid gap-3 md:grid-cols-2">
                  <label className="text-sm"><span className="mb-1 block font-medium">Tamanho nome</span><input type="number" value={template.settings?.nameSize ?? 19} onChange={(e) => setTemplate((t) => ({ ...t, settings: { ...(t.settings || {}), nameSize: Number(e.target.value || 19) } }))} className="w-full rounded-xl border border-slate-200 px-3 py-3" /></label>
                  <label className="text-sm"><span className="mb-1 block font-medium">Tamanho cargo</span><input type="number" value={template.settings?.roleSize ?? 11.26} onChange={(e) => setTemplate((t) => ({ ...t, settings: { ...(t.settings || {}), roleSize: Number(e.target.value || 11.26) } }))} className="w-full rounded-xl border border-slate-200 px-3 py-3" /></label>
                  <label className="text-sm"><span className="mb-1 block font-medium">Tamanho e-mail</span><input type="number" value={template.settings?.emailSize ?? 16} onChange={(e) => setTemplate((t) => ({ ...t, settings: { ...(t.settings || {}), emailSize: Number(e.target.value || 16) } }))} className="w-full rounded-xl border border-slate-200 px-3 py-3" /></label>
                  <label className="text-sm"><span className="mb-1 block font-medium">Tamanho telefone</span><input type="number" value={template.settings?.phoneSize ?? 16} onChange={(e) => setTemplate((t) => ({ ...t, settings: { ...(t.settings || {}), phoneSize: Number(e.target.value || 16) } }))} className="w-full rounded-xl border border-slate-200 px-3 py-3" /></label>
                  <label className="text-sm"><span className="mb-1 block font-medium">Tamanho endereço</span><input type="number" value={template.settings?.addressSize ?? 9} onChange={(e) => setTemplate((t) => ({ ...t, settings: { ...(t.settings || {}), addressSize: Number(e.target.value || 9) } }))} className="w-full rounded-xl border border-slate-200 px-3 py-3" /></label>
                  <label className="text-sm"><span className="mb-1 block font-medium">Tamanho frase central</span><input type="number" value={template.settings?.siteLabelSize ?? 10.09} onChange={(e) => setTemplate((t) => ({ ...t, settings: { ...(t.settings || {}), siteLabelSize: Number(e.target.value || 10.09) } }))} className="w-full rounded-xl border border-slate-200 px-3 py-3" /></label>
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-slate-200 pt-6">
              <h3 className="text-lg font-semibold">Importação CSV</h3>
              <p className="mt-2 text-sm text-slate-500">Campos variáveis: firstName, lastName, role, phone, email.</p>
              <div className="mt-3 grid gap-3">
                <input type="file" accept=".csv,text/csv" onChange={async (e) => { const file = e.target.files?.[0]; if (!file) return; const text = await file.text(); importCsvText(text); }} className="w-full rounded-xl border border-slate-200 px-3 py-3" />
                <input value={csvUrl} onChange={(e) => setCsvUrl(e.target.value)} placeholder="https://docs.google.com/.../export?format=csv" className="w-full rounded-xl border border-slate-200 px-3 py-3" />
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={async () => {
                      if (!csvUrl.trim()) return setBulkStatus("Informe uma URL CSV.");
                      try {
                        setBulkStatus("Buscando CSV da URL e salvando no Supabase...");
                        const res = await fetch("/api/import-signature-csv", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            csvUrl,
                            template_id: template.id ?? null,
                          }),
                        });
                        const json = await res.json().catch(() => null);
                        if (!res.ok || !json?.ok) {
                          setBulkStatus(`Falha ao importar: ${json?.error || res.statusText || "erro desconhecido"}`);
                          return;
                        }
                        await loadProfiles();
                        if (Array.isArray(json.data) && json.data[0]) setProfile(json.data[0]);
                        setLastImportedEmails(Array.isArray(json.data) ? json.data.map((row: Profile) => row.email) : []);
                        setBulkStatus(`${json?.count ?? 0} perfil(is) importado(s) e salvo(s) com sucesso.`);
                      } catch (error) {
                        setBulkStatus(`Erro ao importar via URL: ${error instanceof Error ? error.message : "desconhecido"}`);
                      }
                    }}
                    className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold"
                  >
                    Importar via URL
                  </button>
                  <button onClick={() => navigator.clipboard.writeText(CSV_SAMPLE)} className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold">Copiar CSV modelo</button>
                </div>
                <pre className="overflow-auto rounded-xl bg-slate-50 p-3 text-xs text-slate-600">{CSV_SAMPLE}</pre>
                {bulkStatus ? <p className="text-sm text-slate-600">{bulkStatus}</p> : null}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button onClick={saveTemplate} className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white">Salvar template</button>
              <button onClick={saveProfile} className="rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white">Salvar perfil</button>
              <button onClick={() => copyText(html)} className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold">Copiar HTML</button>
            </div>
            {status ? <p className="mt-3 text-sm text-slate-600">{status}</p> : null}
            <label className="mt-4 block text-sm"><span className="mb-1 block font-medium">Backup para copiar manualmente</span><input readOnly value={copyFallback} className="w-full rounded-xl border border-slate-200 px-3 py-3" /></label>
          </div>

          <div className="sticky top-5 self-start rounded-[18px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl font-semibold">Prévia individual</h2>
              <div className="flex items-center gap-2">
                <button onClick={() => goToProfile("prev")} className="rounded-full border border-slate-300 bg-white px-3 py-2 text-sm font-semibold">←</button>
                <span className="rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600">{profiles.length ? `${Math.max(currentProfileIndex + 1, 1)} de ${profiles.length}` : "0 de 0"}</span>
                <button onClick={() => goToProfile("next")} className="rounded-full border border-slate-300 bg-white px-3 py-2 text-sm font-semibold">→</button>
              </div>
            </div>
            <div className="mt-4 flex min-h-[60vh] justify-center overflow-auto rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6">
              <div dangerouslySetInnerHTML={{ __html: html }} />
            </div>

            <div className="mt-6 border-t border-slate-200 pt-6">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-xl font-semibold">Perfis salvos</h2>
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{profiles.length} perfil(is)</span>
                  <button onClick={loadProfiles} className="rounded-full border border-slate-300 bg-white px-3 py-2 text-xs font-semibold">Recarregar</button>
                </div>
              </div>
              {lastImportedEmails.length > 0 ? <p className="mt-3 text-sm text-emerald-700">Última importação: {lastImportedEmails.length} perfil(is) incluído(s)/atualizado(s).</p> : null}
              <div className="mt-4 grid gap-3">
                {profiles.length === 0 ? <p className="text-sm text-slate-500">Nenhum perfil salvo ainda.</p> : profiles.map((item) => {
                  const isImported = lastImportedEmails.includes(item.email);
                  const isActive = profile.email === item.email;
                  return (
                    <button
                      key={item.email}
                      onClick={() => setProfile(item)}
                      className={`rounded-2xl border px-4 py-4 text-left shadow-sm transition ${isImported ? "border-emerald-300 bg-emerald-50" : "border-slate-200 bg-white"} ${isActive ? "ring-2 ring-slate-300" : ""}`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="font-semibold text-slate-900">{item.first_name} {item.last_name}</div>
                        {isImported ? <span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-700">Novo/importado</span> : null}
                      </div>
                      <div className="mt-1 text-sm text-slate-500">{item.role} • {item.email}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
