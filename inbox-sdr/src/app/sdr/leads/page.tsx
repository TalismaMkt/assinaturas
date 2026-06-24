import { AppShell } from "@/components/app-shell";
import { leads } from "@/lib/mock";

const navItems = [
  { href: "/sdr", label: "Dashboard" },
  { href: "/sdr/inbox", label: "Meu Inbox" },
  { href: "/sdr/leads", label: "Meus Leads" },
  { href: "/sdr/followups", label: "Follow-ups" },
];

export default function SdrLeadsPage() {
  return (
    <AppShell
      title="Meus Leads"
      description="Carteira de leads atribuída ao SDR com status e última interação."
      navItems={navItems}
    >
      <div className="overflow-hidden rounded-[28px] bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-4 text-left text-sm font-semibold text-slate-600">Nome</th>
              <th className="px-4 py-4 text-left text-sm font-semibold text-slate-600">Origem</th>
              <th className="px-4 py-4 text-left text-sm font-semibold text-slate-600">Estágio</th>
              <th className="px-4 py-4 text-left text-sm font-semibold text-slate-600">Última interação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {leads.map((lead) => (
              <tr key={lead.id}>
                <td className="px-4 py-4 text-slate-900">{lead.name}</td>
                <td className="px-4 py-4 text-slate-600">{lead.source}</td>
                <td className="px-4 py-4 text-slate-600">{lead.stage}</td>
                <td className="px-4 py-4 text-slate-600">{lead.lastInteraction}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
