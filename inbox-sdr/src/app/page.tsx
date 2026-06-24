import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.12),_transparent_35%),linear-gradient(to_bottom,#f8fafc,white_55%)] px-6 py-12 text-slate-900 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-full border border-emerald-100 bg-white/80 px-5 py-3 shadow-sm backdrop-blur">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-600">Inbox SDR</p>
        </div>

        <section className="grid gap-10 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-8">
            <h1 className="text-5xl font-black tracking-tight text-slate-950 sm:text-6xl">
              Centralize leads, SDRs e conversas em uma operação comercial de verdade.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-600">
              MVP funcional para receber leads do ActiveCampaign, distribuir atendimento e supervisionar conversas em tempo real.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/admin" className="rounded-full bg-slate-950 px-8 py-4 font-semibold text-white">
                Abrir área admin
              </Link>
              <Link href="/sdr" className="rounded-full border border-slate-300 px-8 py-4 font-semibold text-slate-900">
                Abrir área SDR
              </Link>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              ["Leads novos", "42"],
              ["Conversas ativas", "19"],
              ["SDRs online", "6"],
              ["Tempo médio", "5 min"],
            ].map(([label, value]) => (
              <article key={label} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm uppercase tracking-[0.16em] text-slate-500">{label}</p>
                <h2 className="mt-4 text-4xl font-black text-slate-950">{value}</h2>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
