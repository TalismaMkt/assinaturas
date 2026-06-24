import Link from "next/link";
import { AppShell } from "@/components/app-shell";

const navItems = [
  { href: "/sdr", label: "Dashboard" },
  { href: "/sdr/inbox", label: "Meu Inbox" },
  { href: "/sdr/leads", label: "Meus Leads" },
  { href: "/sdr/followups", label: "Follow-ups" },
];

export default function SdrPage() {
  return (
    <AppShell
      title="Dashboard SDR"
      description="Visão individual do SDR com leads atribuídos, follow-ups e conversas prioritárias."
      navItems={navItems}
    >
      <section className="grid gap-6 md:grid-cols-4">
        {[
          ["Leads novos", "8"],
          ["Follow-ups hoje", "5"],
          ["Conversas abertas", "12"],
          ["Tempo médio", "4 min"],
        ].map(([label, value]) => (
          <article key={label} className="rounded-[28px] bg-white p-6 shadow-sm">
            <p className="text-sm uppercase tracking-[0.16em] text-slate-500">{label}</p>
            <h2 className="mt-4 text-4xl font-black text-slate-950">{value}</h2>
          </article>
        ))}
      </section>

      <section className="rounded-[28px] bg-white p-8 shadow-sm">
        <h3 className="text-2xl font-bold text-slate-950">Ações rápidas</h3>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link href="/sdr/inbox" className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white">
            Abrir inbox
          </Link>
          <Link href="/sdr/leads" className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-900">
            Ver meus leads
          </Link>
        </div>
      </section>
    </AppShell>
  );
}
