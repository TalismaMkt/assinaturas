import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { deliveries } from "@/lib/mock";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/clientes", label: "Clientes" },
  { href: "/demandas", label: "Demandas" },
  { href: "/entregas", label: "Entregas" },
];

export default function EntregasPage() {
  return (
    <AppShell
      title="Entregas"
      description="Visão do que está saindo do papel, o que está em revisão e o que já tem conexão clara com cliente e demanda."
      navItems={navItems}
    >
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {deliveries.map((delivery) => (
          <article key={delivery.id} className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{delivery.client}</p>
            <h3 className="mt-2 text-2xl font-black text-slate-950">{delivery.name}</h3>
            <div className="mt-4 space-y-2 text-sm text-slate-600">
              <p><strong>Demanda:</strong> {delivery.relatedDemand}</p>
              <p><strong>Tipo:</strong> {delivery.type}</p>
              <p><strong>Status:</strong> {delivery.status}</p>
              <p><strong>Etapa:</strong> {delivery.stage}</p>
              <p><strong>Responsável:</strong> {delivery.owner}</p>
              <p><strong>Prazo:</strong> {delivery.dueDate}</p>
            </div>
            <div className="mt-5 flex gap-4 text-sm font-semibold text-amber-700">
              <Link href={`/clientes/${delivery.clientSlug}`}>Conta →</Link>
              <Link href={`/demandas/${delivery.demandSlug}`}>Demanda →</Link>
            </div>
          </article>
        ))}
      </div>
    </AppShell>
  );
}
