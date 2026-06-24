import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { clients, demands, deliveries, recentActivity } from "@/lib/mock";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/clientes", label: "Clientes" },
  { href: "/demandas", label: "Demandas" },
  { href: "/entregas", label: "Entregas" },
];

export default function DashboardPage() {
  return (
    <AppShell
      title="Visão geral da operação"
      description="Uma leitura mais viva do que está acontecendo agora na agência: contas ativas, prioridades, gargalos e entregas em andamento."
      navItems={navItems}
    >
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {[
          ["Clientes ativos", String(clients.length), "Contas em operação"],
          ["Demandas abertas", String(demands.length), "Fluxo atual da agência"],
          ["Entregas do ciclo", String(deliveries.length), "Materiais em produção"],
          ["Urgências", "2", "Itens com prioridade alta"],
        ].map(([label, value, helper]) => (
          <article key={label} className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-sm">
            <p className="text-sm uppercase tracking-[0.18em] text-slate-500">{label}</p>
            <h3 className="mt-4 text-4xl font-black">{value}</h3>
            <p className="mt-2 text-sm text-slate-500">{helper}</p>
          </article>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <section className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-black">Demandas prioritárias</h3>
              <p className="mt-1 text-sm text-slate-500">O que pede atenção agora na operação.</p>
            </div>
            <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">Hoje</span>
          </div>
          <div className="mt-6 space-y-4">
            {demands.map((demand) => (
              <article key={demand.id} className="rounded-2xl border border-stone-200 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{demand.client} • {demand.type}</p>
                    <h4 className="mt-1 text-lg font-bold text-slate-950">{demand.name}</h4>
                  </div>
                  <div className="flex gap-2">
                    <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">{demand.priority}</span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-700">{demand.status}</span>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">{demand.description}</p>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500">
                  <span><strong>Próximo passo:</strong> {demand.nextStep}</span>
                  <Link href={`/demandas/${demand.slug}`} className="font-semibold text-amber-700">
                    Ver detalhe →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="space-y-6">
          <section className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-sm">
            <h3 className="text-2xl font-black">Atividade recente</h3>
            <div className="mt-5 space-y-4">
              {recentActivity.map((activity) => (
                <article key={activity.id} className="rounded-2xl bg-stone-50 p-4">
                  <h4 className="font-bold text-slate-950">{activity.title}</h4>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{activity.detail}</p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">{activity.time}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-sm">
            <h3 className="text-2xl font-black">Entregas do momento</h3>
            <div className="mt-5 space-y-4">
              {deliveries.map((delivery) => (
                <article key={delivery.id} className="rounded-2xl border border-stone-200 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{delivery.client}</p>
                  <h4 className="mt-1 font-bold text-slate-950">{delivery.name}</h4>
                  <p className="mt-2 text-sm text-slate-600">{delivery.stage} • {delivery.status}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </AppShell>
  );
}
