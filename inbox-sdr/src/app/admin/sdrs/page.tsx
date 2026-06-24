import { AppShell } from "@/components/app-shell";

const navItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/conversations", label: "Conversas" },
  { href: "/admin/sdrs", label: "SDRs" },
];

export default function AdminSdrsPage() {
  return (
    <AppShell
      title="SDRs"
      description="Acompanhe time online, carga atual e performance comercial da operação."
      navItems={navItems}
    >
      <section className="grid gap-6 md:grid-cols-3">
        {[
          ["João SDR", "24 leads · 5 min resposta"],
          ["Ana SDR", "18 leads · 7 min resposta"],
          ["Pedro SDR", "16 leads · 4 min resposta"],
        ].map(([name, info]) => (
          <article key={name} className="rounded-[28px] bg-white p-6 shadow-sm">
            <h3 className="text-2xl font-bold text-slate-950">{name}</h3>
            <p className="mt-4 text-slate-600">{info}</p>
          </article>
        ))}
      </section>
    </AppShell>
  );
}
