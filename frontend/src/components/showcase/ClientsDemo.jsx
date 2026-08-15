import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MessageSquare, CalendarCheck } from "lucide-react";
import { clients as seed } from "@/data/mock";

export default function ClientsDemo() {
  const [clients, setClients] = useState(seed);
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState("cl1");

  const list = useMemo(
    () => clients.filter((c) => c.name.toLowerCase().includes(query.toLowerCase())),
    [clients, query]
  );
  const active = clients.find((c) => c.id === activeId);

  const toggleOptin = (id) => {
    setClients((cs) => cs.map((c) => (c.id === id ? { ...c, optin: !c.optin } : c)));
  };

  return (
    <div className="grid lg:grid-cols-[1fr_280px]" data-testid="clients-demo">
      <div className="p-5">
        <div className="relative mb-4 max-w-sm">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-steel/50" />
          <input
            data-testid="clients-search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar cliente…"
            className="w-full rounded-xl border border-line bg-ink py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-steel/50 focus:border-teal/40 focus:outline-none"
          />
        </div>

        <div className="overflow-hidden rounded-xl border border-line">
          <div className="grid grid-cols-[1fr_auto_auto] gap-3 border-b border-line bg-surface2/60 px-4 py-2.5 font-mono text-[10px] uppercase tracking-widest text-steel sm:grid-cols-[1.4fr_1fr_auto_auto]">
            <span>Cliente</span>
            <span className="hidden sm:block">Último contato</span>
            <span>Opt-in</span>
            <span className="w-8" />
          </div>
          {list.map((c) => (
            <button
              key={c.id}
              data-testid={`client-row-${c.id}`}
              onClick={() => setActiveId(c.id)}
              className={`grid w-full grid-cols-[1fr_auto_auto] items-center gap-3 border-b border-line/50 px-4 py-3 text-left transition-colors sm:grid-cols-[1.4fr_1fr_auto_auto] ${
                activeId === c.id ? "bg-teal/[0.05]" : "hover:bg-white/[0.02]"
              }`}
            >
              <span className="flex min-w-0 items-center gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-surface2 font-display text-xs font-bold text-teal">
                  {c.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium text-white">{c.name}</span>
                  <span className="block font-mono text-[10px] text-steel/60">{c.phone}</span>
                </span>
              </span>
              <span className="hidden text-xs text-steel sm:block">{c.last}</span>
              <span
                role="switch"
                aria-checked={c.optin}
                data-testid={`client-optin-${c.id}`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleOptin(c.id);
                }}
                className={`relative h-5 w-9 cursor-pointer rounded-full transition-colors duration-300 ${c.optin ? "bg-teal" : "bg-zinc-700"}`}
              >
                <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all duration-300 ${c.optin ? "left-[18px]" : "left-0.5"}`} />
              </span>
              <span className="w-8 text-right">
                {c.tags[0] && <span className="rounded-full border border-line px-2 py-0.5 font-mono text-[9px] text-steel">{c.tags[0]}</span>}
              </span>
            </button>
          ))}
          {list.length === 0 && <p className="px-4 py-8 text-center text-sm text-steel">Nenhum cliente encontrado.</p>}
        </div>
      </div>

      <div className="border-t border-line p-5 lg:border-l lg:border-t-0">
        <AnimatePresence mode="wait">
          <motion.div key={active.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} data-testid="client-detail-panel">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-teal-dim font-display text-base font-bold text-teal">
                {active.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
              </span>
              <div>
                <p className="font-display text-base font-bold text-white">{active.name}</p>
                <p className="font-mono text-[10px] text-steel">cliente desde {active.since}</p>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-line bg-surface2/50 p-3.5 text-center">
                <MessageSquare className="mx-auto mb-1.5 h-4 w-4 text-teal" />
                <p className="font-display text-xl font-bold text-white">{active.conversations}</p>
                <p className="text-[10px] text-steel">conversas</p>
              </div>
              <div className="rounded-xl border border-line bg-surface2/50 p-3.5 text-center">
                <CalendarCheck className="mx-auto mb-1.5 h-4 w-4 text-teal" />
                <p className="font-display text-xl font-bold text-white">{active.appointments}</p>
                <p className="text-[10px] text-steel">agendamentos</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between rounded-xl border border-line px-3.5 py-3">
              <span className="text-xs text-steel">Opt-in de marketing</span>
              <span className={`rounded-full border px-2.5 py-1 text-[10px] ${active.optin ? "border-teal/30 bg-teal/10 text-teal" : "border-line text-steel"}`}>
                {active.optin ? "Ativo" : "Inativo"}
              </span>
            </div>
            {active.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {active.tags.map((t) => (
                  <span key={t} className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] text-steel">{t}</span>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
