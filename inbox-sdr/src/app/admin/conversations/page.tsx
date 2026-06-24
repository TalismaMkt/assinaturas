import { AppShell } from "@/components/app-shell";
import { conversations } from "@/lib/mock";

const navItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/conversations", label: "Conversas" },
  { href: "/admin/sdrs", label: "SDRs" },
];

export default function AdminConversationsPage() {
  return (
    <AppShell
      title="Conversas"
      description="Supervisione o inbox da operação em tempo real e veja o contexto de cada atendimento."
      navItems={navItems}
    >
      <div className="grid gap-6 lg:grid-cols-[360px_1fr_320px]">
        <article className="rounded-[28px] bg-white p-6 shadow-sm">
          <h3 className="text-xl font-bold text-slate-950">Inbox</h3>
          <div className="mt-6 space-y-4">
            {conversations.map((item) => (
              <div key={item.id} className="rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-slate-950">{item.lead}</p>
                  <span className="text-xs text-slate-500">{item.time}</span>
                </div>
                <p className="mt-2 text-sm text-slate-600">{item.preview}</p>
                <p className="mt-2 text-xs text-emerald-700">{item.owner} · {item.unread} não lidas</p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[28px] bg-white p-8 shadow-sm">
          <h3 className="text-2xl font-bold text-slate-950">Chat em tempo real</h3>
          <div className="mt-6 space-y-4">
            <div className="max-w-md rounded-3xl bg-slate-100 px-5 py-4 text-slate-700">
              Olá, quero entender como funciona o atendimento.
            </div>
            <div className="ml-auto max-w-md rounded-3xl bg-emerald-600 px-5 py-4 text-white">
              Claro! Vou te explicar como funciona o processo.
            </div>
          </div>
        </article>

        <article className="rounded-[28px] bg-white p-8 shadow-sm">
          <h3 className="text-2xl font-bold text-slate-950">Lead atual</h3>
          <div className="mt-6 space-y-3 text-slate-600">
            <p><strong>Nome:</strong> Maria Silva</p>
            <p><strong>Origem:</strong> ActiveCampaign</p>
            <p><strong>SDR:</strong> João SDR</p>
            <p><strong>Estágio:</strong> Qualificado</p>
          </div>
        </article>
      </div>
    </AppShell>
  );
}
