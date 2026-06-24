import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { clients } from "@/lib/mock";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/clientes", label: "Clientes" },
  { href: "/demandas", label: "Demandas" },
  { href: "/entregas", label: "Entregas" },
];

export default function ClientesPage() {
  return (
    <AppShell
      title="Clientes"
      description="Base inicial das contas da agência com mais contexto de operação, escopo e volume ativo."
      navItems={navItems}
    >
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {clients.map((client) => (
          <article key={client.id} className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">{client.segment}</p>
                <h3 className="mt-2 text-2xl font-black text-slate-950">{client.name}</h3>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">{client.status}</span>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600">{client.summary}</p>
            <div className="mt-5 space-y-2 text-sm text-slate-600">
              <p><strong>Serviço:</strong> {client.serviceType}</p>
              <p><strong>Responsável:</strong> {client.owner}</p>
              <p><strong>Local:</strong> {client.location}</p>
              <p><strong>Demandas ativas:</strong> {client.activeDemands}</p>
              <p><strong>Campanhas ativas:</strong> {client.activeCampaigns}</p>
            </div>
            <Link href={`/clientes/${client.slug}`} className="mt-5 inline-flex font-semibold text-amber-700">
              Abrir conta →
            </Link>
          </article>
        ))}
      </div>
    </AppShell>
  );
}
