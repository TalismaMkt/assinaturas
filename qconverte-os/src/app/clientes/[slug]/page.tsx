import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { clients, demands, deliveries } from "@/lib/mock";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/clientes", label: "Clientes" },
  { href: "/demandas", label: "Demandas" },
  { href: "/entregas", label: "Entregas" },
];

export default async function ClienteDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const client = clients.find((item) => item.slug === slug);
  if (!client) return notFound();

  const relatedDemands = demands.filter((item) => item.clientSlug === slug);
  const relatedDeliveries = deliveries.filter((item) => item.clientSlug === slug);

  return (
    <AppShell
      title={client.name}
      description={client.summary}
      navItems={navItems}
    >
      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <article className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-sm">
          <h3 className="text-2xl font-black">Visão da conta</h3>
          <div className="mt-5 space-y-3 text-sm text-slate-600">
            <p><strong>Segmento:</strong> {client.segment}</p>
            <p><strong>Status:</strong> {client.status}</p>
            <p><strong>Responsável:</strong> {client.owner}</p>
            <p><strong>Escopo:</strong> {client.serviceType}</p>
            <p><strong>Local:</strong> {client.location}</p>
            <p><strong>Demandas ativas:</strong> {client.activeDemands}</p>
            <p><strong>Campanhas ativas:</strong> {client.activeCampaigns}</p>
          </div>
        </article>

        <article className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-sm">
          <h3 className="text-2xl font-black">Demandas relacionadas</h3>
          <div className="mt-5 space-y-4">
            {relatedDemands.map((demand) => (
              <div key={demand.id} className="rounded-2xl bg-stone-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <h4 className="font-bold text-slate-950">{demand.name}</h4>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-700">{demand.status}</span>
                </div>
                <p className="mt-2 text-sm text-slate-600">{demand.nextStep}</p>
                <Link href={`/demandas/${demand.slug}`} className="mt-3 inline-flex text-sm font-semibold text-amber-700">
                  Ver demanda →
                </Link>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-sm">
        <h3 className="text-2xl font-black">Entregas ligadas à conta</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {relatedDeliveries.map((delivery) => (
            <article key={delivery.id} className="rounded-2xl border border-stone-200 p-4">
              <h4 className="font-bold text-slate-950">{delivery.name}</h4>
              <p className="mt-2 text-sm text-slate-600">{delivery.stage} • {delivery.status}</p>
            </article>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
