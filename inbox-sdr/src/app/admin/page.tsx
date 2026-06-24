import Link from "next/link";
import { AppShell } from "@/components/app-shell";

const navItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/conversations", label: "Conversas" },
  { href: "/admin/sdrs", label: "SDRs" },
];

export default function AdminPage() {
  return (
    <AppShell
      title="Dashboard Admin"
      description="Visão geral da operação com monitoramento de leads, SDRs e conversas em tempo real."
      navItems={navItems}
    >
      <section className="grid gap-6 md:grid-cols-4">
        {[
          ["Leads novos", "42"],
          ["Sem resposta", "11"],
          ["Conversões", "7"],
          ["Tempo médio", "5 min"],
        ].map(([label, value]) => (
          <article key={label} className="rounded-[28px] bg-white p-6 shadow-sm">
            <p className="text-sm uppercase tracking-[0.16em] text-slate-500">{label}</p>
            <h2 className="mt-4 text-4xl font-black text-slate-950">{value}</h2>
          </article>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-[28px] bg-white p-8 shadow-sm">
          <h3 className="text-2xl font-bold text-slate-950">Alertas operacionais</h3>
          <div className="mt-6 space-y-4 text-slate-600">
            <p>Lead sem resposta há 18 minutos</p>
            <p>SDR com backlog alto</p>
            <p>Follow-up vencido para hoje</p>
          </div>
        </article>

        <article className="rounded-[28px] bg-white p-8 shadow-sm">
          <h3 className="text-2xl font-bold text-slate-950">Atalhos rápidos</h3>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link href="/admin/leads" className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white">
              Ver leads
            </Link>
            <Link href="/admin/conversations" className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-900">
              Ver conversas
            </Link>
          </div>
        </article>
      </section>
    </AppShell>
  );
}
