import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { demands } from "@/lib/mock";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/clientes", label: "Clientes" },
  { href: "/demandas", label: "Demandas" },
  { href: "/entregas", label: "Entregas" },
];

export default function DemandasPage() {
  return (
    <AppShell
      title="Demandas"
      description="O coração operacional da agência com prioridade, prazo, responsável e próximo passo mais claro."
      navItems={navItems}
    >
      <div className="space-y-4">
        {demands.map((demand) => (
          <article key={demand.id} className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{demand.client} • {demand.type}</p>
                <h3 className="mt-2 text-2xl font-black text-slate-950">{demand.name}</h3>
              </div>
              <div className="flex gap-2">
                <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">{demand.priority}</span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-700">{demand.status}</span>
              </div>
            </div>
            <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-600">{demand.description}</p>
            <div className="mt-4 grid gap-3 rounded-2xl bg-stone-50 p-4 text-sm text-slate-600 md:grid-cols-3">
              <p><strong>Responsável:</strong> {demand.owner}</p>
              <p><strong>Prazo:</strong> {demand.dueDate}</p>
              <p><strong>Próximo passo:</strong> {demand.nextStep}</p>
            </div>
            <Link href={`/demandas/${demand.slug}`} className="mt-4 inline-flex font-semibold text-amber-700">
              Abrir demanda →
            </Link>
          </article>
        ))}
      </div>
    </AppShell>
  );
}
