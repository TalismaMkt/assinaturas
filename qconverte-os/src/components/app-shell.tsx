import Link from "next/link";

export function AppShell({
  title,
  description,
  navItems,
  children,
}: {
  title: string;
  description: string;
  navItems: { href: string; label: string }[];
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen text-slate-900">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-8 lg:grid-cols-[280px_1fr] lg:px-8">
        <aside className="qc-panel rounded-[32px] p-6 lg:sticky lg:top-8 lg:h-fit">
          <p className="qc-kicker text-amber-800">QConverte OS</p>
          <h1 className="qc-display mt-4 text-[2.2rem] leading-[0.95] text-slate-950">Operação da Agência</h1>
          <p className="qc-muted mt-4 text-sm leading-6">
            Uma base mais refinada para validar o fluxo entre clientes, demandas e entregas com cara de produto autoral.
          </p>

          <nav className="mt-8 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-2xl border border-transparent bg-white/70 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-stone-200 hover:bg-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-8 rounded-[24px] bg-slate-950 p-5 text-white">
            <p className="qc-kicker text-amber-300">Modo atual</p>
            <h3 className="mt-2 text-xl font-semibold">MVP em evolução</h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">Primeiro a lógica. Agora o refinamento visual e a sensação de produto real.</p>
          </div>

          <Link href="/" className="mt-8 inline-flex rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900">
            Voltar ao início
          </Link>
        </aside>

        <section className="space-y-8">
          <header className="qc-panel rounded-[40px] px-8 py-10 text-slate-950">
            <p className="qc-kicker text-amber-800">QConverte • Sistema vivo</p>
            <h2 className="qc-display mt-4 max-w-4xl text-5xl leading-[0.96] font-semibold">{title}</h2>
            <p className="qc-muted mt-5 max-w-3xl text-lg leading-8">{description}</p>
          </header>
          {children}
        </section>
      </div>
    </main>
  );
}
