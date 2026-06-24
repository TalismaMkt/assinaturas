import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen px-5 py-10 text-slate-900 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="inline-flex rounded-full border border-stone-200 bg-white/80 px-5 py-3 shadow-sm backdrop-blur">
          <p className="qc-kicker text-amber-800">QConverte OS</p>
        </div>

        <section className="grid gap-10 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-8">
            <h1 className="qc-display max-w-4xl text-6xl leading-[0.94] font-semibold text-slate-950 sm:text-7xl">
              Uma base mais elegante para operar a agência com visão, ritmo e contexto.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-600">
              Essa versão tira a QConverte OS do abstrato e coloca de pé um sistema inicial com cara mais autoral, mais estratégica e menos genérica.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/dashboard" className="rounded-full bg-slate-950 px-8 py-4 font-semibold text-white shadow-sm">
                Abrir dashboard
              </Link>
              <Link href="/clientes" className="rounded-full border border-stone-300 bg-white px-8 py-4 font-semibold text-slate-900">
                Ver clientes
              </Link>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              ["Clientes ativos", "3"],
              ["Demandas abertas", "4"],
              ["Entregas mapeadas", "3"],
              ["Estágio", "v1 refinada"],
            ].map(([label, value]) => (
              <article key={label} className="qc-panel rounded-[32px] p-6">
                <p className="qc-kicker text-slate-500">{label}</p>
                <h2 className="mt-4 text-4xl font-black text-slate-950">{value}</h2>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
