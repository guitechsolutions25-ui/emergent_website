import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Megaphone, Workflow, Users, Plug2, BarChart3 } from "lucide-react";
import { SectionHead } from "@/components/Reveal";
import InboxDemo from "./InboxDemo";
import CampaignsDemo from "./CampaignsDemo";
import FlowDemo from "./FlowDemo";
import ClientsDemo from "./ClientsDemo";
import IntegrationsDemo from "./IntegrationsDemo";
import AnalyticsDemo from "./AnalyticsDemo";

const tabs = [
  { id: "conversas", label: "Conversas", icon: MessageSquare },
  { id: "campanhas", label: "Campanhas", icon: Megaphone },
  { id: "fluxos", label: "Fluxos", icon: Workflow },
  { id: "clientes", label: "Clientes", icon: Users },
  { id: "integracoes", label: "Integrações", icon: Plug2 },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
];

export default function Showcase() {
  const [tab, setTab] = useState("conversas");

  return (
    <section id="demo" className="relative py-28 lg:py-36" data-testid="showcase-section">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(0,217,165,0.06),transparent)]" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHead
          align="center"
          chapter={["02", "A plataforma"]}
          title={<>Isto não é uma captura de tela.</>}
          sub="Explore demonstrações interativas construídas com a mesma linguagem visual do produto real. Clique, selecione, navegue — é assim que usar a Kromera se sente."
        />

        <div className="mt-14 flex justify-center" data-testid="showcase-tabs">
          <div className="glass flex max-w-full flex-wrap justify-center gap-1 rounded-2xl border border-line p-1.5">
            {tabs.map((t) => (
              <button
                key={t.id}
                data-testid={`showcase-tab-${t.id}`}
                onClick={() => setTab(t.id)}
                className={`relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors duration-300 ${tab === t.id ? "text-ink" : "text-steel hover:text-white"}`}
              >
                {tab === t.id && (
                  <motion.span
                    layoutId="showcase-tab-pill"
                    className="absolute inset-0 rounded-xl bg-teal"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <t.icon className="relative z-10 h-4 w-4" />
                <span className="relative z-10 hidden sm:inline">{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl shadow-black/60" data-testid="showcase-panel">
          <div className="flex items-center justify-between border-b border-line bg-surface2/60 px-5 py-3">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                <span className="h-2.5 w-2.5 rounded-full bg-teal/70" />
              </div>
              <span className="font-mono text-[11px] text-steel">Painel Luna · Kromera</span>
            </div>
            <span className="rounded-full border border-teal/25 bg-teal/5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-teal">
              Demonstração interativa · dados simulados
            </span>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {tab === "conversas" && <InboxDemo />}
              {tab === "campanhas" && <CampaignsDemo />}
              {tab === "fluxos" && <FlowDemo />}
              {tab === "clientes" && <ClientsDemo />}
              {tab === "integracoes" && <IntegrationsDemo />}
              {tab === "analytics" && <AnalyticsDemo compact />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
