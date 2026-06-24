import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { demands, deliveries } from "@/lib/mock";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/clientes", label: "Clientes" },
  { href: "/demandas", label: "Demandas" },
  { href: "/entregas", label: "Entregas" },
];

export default async function DemandaDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const demand = demands.find((item) => item.slug === slug);
  if (!demand) return notFound();

  const relatedDeliveries = deliveries.filter((item) => item.demandSlug === slug);

  return (
    <AppShell
      title={demand.name}
      description={demand.description}
      navItems={navItems}
    >
      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <article className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-sm">
          <h3 className="text-2xl font-black">Resumo operacional</h3>
          <div className="mt-5 space-y-3 text-sm text-slate-600">
            <p><strong>Cliente:</strong> {demand.client}</p>
            <p><strong>Tipo:</strong> {demand.type}</p>
            <p><strong>Prioridade:</strong> {demand.priority}</p>
            <p><strong>Status:</strong> {demand.status}</p>
            <p><strong>Responsável:</strong> {demand.owner}</p>
            <p><strong>Prazo:</strong> {demand.dueDate}</p>
          </div>
        </article>

        <article className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-sm">
          <h3 className="text-2xl font-black">Próximo passo</h3>
          <p className="mt-4 text-sm leading-7 text-slate-600">{demand.nextStep}</p>
          <div className="mt-6 rounded-2xl bg-stone-50 p-4 text-sm text-slate-600">
            <p><strong>Descrição:</strong> {demand.description}</p>
          </div>
          <Link href={`/clientes/${demand.clientSlug}`} className="mt-5 inline-flex font-semibold text-amber-700">
            Ver conta do cliente →
          </Link>
        </article>
      </section>

      <section className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-sm">
        <h3 className="text-2xl font-black">Entregas relacionadas</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {relatedDeliveries.map((delivery) => (
            <article key={delivery.id} className="rounded-2xl border border-stone-200 p-4">
              <h4 className="font-bold text-slate-950">{delivery.name}</h4>
              <p className="mt-2 text-sm text-slate-600">{delivery.type} • {delivery.status}</p>
            </article>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
