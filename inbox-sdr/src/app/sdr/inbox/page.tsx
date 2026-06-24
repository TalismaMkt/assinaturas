import { AppShell } from "@/components/app-shell";
import { conversations } from "@/lib/mock";

const navItems = [
  { href: "/sdr", label: "Dashboard" },
  { href: "/sdr/inbox", label: "Meu Inbox" },
  { href: "/sdr/leads", label: "Meus Leads" },
  { href: "/sdr/followups", label: "Follow-ups" },
];

export default function SdrInboxPage() {
  return (
    <AppShell
      title="Meu Inbox"
      description="Atenda leads atribuídos e avance o pipeline a partir da conversa."
      navItems={navItems}
    >
      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        <article className="rounded-[28px] bg-white p-6 shadow-sm">
          <h3 className="text-xl font-bold text-slate-950">Conversas</h3>
          <div className="mt-6 space-y-4">
            {conversations.map((item) => (
              <div key={item.id} className="rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-slate-950">{item.lead}</p>
                  <span className="text-xs text-slate-500">{item.time}</span>
                </div>
                <p className="mt-2 text-sm text-slate-600">{item.preview}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[28px] bg-white p-8 shadow-sm">
          <h3 className="text-2xl font-bold text-slate-950">Conversa atual</h3>
          <div className="mt-6 space-y-4">
            <div className="max-w-md rounded-3xl bg-slate-100 px-5 py-4 text-slate-700">
              Olá, gostaria de entender melhor os planos.
            </div>
            <div className="ml-auto max-w-md rounded-3xl bg-emerald-600 px-5 py-4 text-white">
              Claro! Vou te explicar e entender seu objetivo.
            </div>
          </div>
        </article>
      </div>
    </AppShell>
  );
}
