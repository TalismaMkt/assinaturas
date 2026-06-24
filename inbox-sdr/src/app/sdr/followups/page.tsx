import { AppShell } from "@/components/app-shell";

const navItems = [
  { href: "/sdr", label: "Dashboard" },
  { href: "/sdr/inbox", label: "Meu Inbox" },
  { href: "/sdr/leads", label: "Meus Leads" },
  { href: "/sdr/followups", label: "Follow-ups" },
];

export default function SdrFollowupsPage() {
  return (
    <AppShell
      title="Follow-ups"
      description="Não deixe nenhum lead morrer: organize retornos e prioridades do dia."
      navItems={navItems}
    >
      <section className="grid gap-6 md:grid-cols-3">
        {[
          ["Hoje 10:00", "Maria Silva · retorno combinado"],
          ["Hoje 14:00", "Carlos Mendes · aguardar proposta"],
          ["Amanhã 09:30", "Fernanda Alves · nova tentativa"],
        ].map(([time, info]) => (
          <article key={time} className="rounded-[28px] bg-white p-6 shadow-sm">
            <p className="text-sm uppercase tracking-[0.16em] text-emerald-600">{time}</p>
            <h3 className="mt-4 text-xl font-bold text-slate-950">{info}</h3>
          </article>
        ))}
      </section>
    </AppShell>
  );
}
