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
    <main className="min-h-screen bg-[#f7f5ef] text-slate-900">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[250px_1fr] lg:px-8">
        <aside className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-8 lg:h-fit">
          <p className="text-sm uppercase tracking-[0.24em] text-emerald-600">Inbox SDR</p>
          <h1 className="mt-3 text-3xl font-black">Operação Comercial</h1>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            MVP real para leads, SDRs, conversas e supervisão em tempo real.
          </p>

          <nav className="mt-8 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-2xl bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link href="/" className="mt-8 inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white">
            Voltar ao início
          </Link>
        </aside>

        <section className="space-y-8">
          <header className="rounded-[32px] bg-slate-950 p-8 text-white shadow-sm">
            <p className="text-sm uppercase tracking-[0.24em] text-emerald-300">MVP</p>
            <h2 className="mt-3 text-4xl font-black">{title}</h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">{description}</p>
          </header>
          {children}
        </section>
      </div>
    </main>
  );
}
