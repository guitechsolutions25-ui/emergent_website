import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, FileText, Sparkles, User } from "lucide-react";
import { conversations, statusMeta } from "@/data/mock";

function Bubble({ msg, i }) {
  if (msg.from === "system") {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.12 }} className="my-2 text-center">
        <span className="rounded-full border border-amber-400/20 bg-amber-400/5 px-3 py-1 font-mono text-[10px] text-amber-300/90">{msg.text}</span>
      </motion.div>
    );
  }
  const isLuna = msg.from === "luna";
  const isAgent = msg.from === "agent";
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: i * 0.12, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`flex ${isLuna || isAgent ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isLuna
            ? "rounded-br-sm border border-teal/25 bg-teal-deep text-teal-50 text-white/90"
            : isAgent
              ? "rounded-br-sm border border-amber-400/25 bg-amber-400/10 text-white/90"
              : "rounded-bl-sm bg-surface2 text-white/85"
        }`}
      >
        {msg.campaign && <p className="mb-1 font-mono text-[9px] uppercase tracking-widest text-teal/70">{msg.campaign}</p>}
        {(isLuna || isAgent) && (
          <p className={`mb-1 font-mono text-[10px] font-medium ${isLuna ? "text-teal" : "text-amber-300"}`}>{isLuna ? "Luna" : msg.agentName}</p>
        )}
        <p>{msg.text}</p>
        {msg.file && (
          <div className="mt-2 flex items-center gap-2 rounded-lg border border-teal/20 bg-ink/40 px-3 py-2">
            <FileText className="h-4 w-4 text-teal" />
            <span className="font-mono text-[11px] text-white/80">{msg.file}</span>
          </div>
        )}
        {msg.buttons && (
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {msg.buttons.map((b) => (
              <span key={b} className="rounded-full border border-teal/30 bg-teal/10 px-3 py-1 text-xs text-teal">
                {b}
              </span>
            ))}
          </div>
        )}
        <p className="mt-1.5 text-right font-mono text-[9px] text-white/30">{msg.time}</p>
      </div>
    </motion.div>
  );
}

export default function InboxDemo() {
  const [activeId, setActiveId] = useState("marina");
  const [filter, setFilter] = useState("todas");
  const [summaries, setSummaries] = useState({});
  const [sent, setSent] = useState({});
  const [input, setInput] = useState("");

  const active = conversations.find((c) => c.id === activeId);
  const list = useMemo(
    () => (filter === "escalonadas" ? conversations.filter((c) => c.status === "escalated") : conversations),
    [filter]
  );
  const msgs = [...active.messages, ...(sent[activeId] || [])];

  const send = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const mine = { from: "customer", text: input.trim(), time: "agora" };
    setSent((s) => ({ ...s, [activeId]: [...(s[activeId] || []), mine] }));
    setInput("");
    setTimeout(() => {
      setSent((s) => ({
        ...s,
        [activeId]: [
          ...(s[activeId] || []).filter((m) => m !== mine),
          mine,
          { from: "luna", text: "Sou a Luna em modo demonstração. No produto real, eu responderia usando o conhecimento da sua empresa.", time: "agora" },
        ],
      }));
    }, 1000);
  };

  const ListButton = ({ c }) => (
    <button
      key={c.id}
      data-testid={`conversation-item-${c.id}`}
      onClick={() => setActiveId(c.id)}
      className={`flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors duration-200 lg:border-l-2 ${
        activeId === c.id ? "bg-teal/[0.07] lg:border-teal" : "lg:border-transparent hover:bg-white/[0.03]"
      }`}
    >
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-surface2 text-steel">
        <User className="h-4 w-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center justify-between gap-2">
          <span className="truncate text-sm font-medium text-white">{c.name}</span>
          <span className="font-mono text-[10px] text-steel/60">{c.time}</span>
        </span>
        <span className={`mt-0.5 flex items-center gap-1.5 text-[11px] ${statusMeta[c.status].cls}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${statusMeta[c.status].dot}`} />
          {statusMeta[c.status].label}
        </span>
      </span>
    </button>
  );

  return (
    <div className="grid lg:grid-cols-[260px_1fr_240px]" data-testid="inbox-demo">
      <div className="hidden border-r border-line lg:block">
        <div className="flex gap-1 border-b border-line p-3">
          {["todas", "escalonadas"].map((f) => (
            <button
              key={f}
              data-testid={`inbox-filter-${f}`}
              onClick={() => setFilter(f)}
              className={`rounded-lg px-3 py-1.5 text-xs capitalize transition-colors ${filter === f ? "bg-teal/10 text-teal" : "text-steel hover:text-white"}`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="max-h-[520px] overflow-y-auto">{list.map((c) => <ListButton key={c.id} c={c} />)}</div>
      </div>

      <div className="flex gap-2 overflow-x-auto border-b border-line p-3 lg:hidden">
        {list.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveId(c.id)}
            className={`shrink-0 rounded-full border px-4 py-2 text-xs ${activeId === c.id ? "border-teal/40 bg-teal/10 text-teal" : "border-line text-steel"}`}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div className="flex h-[560px] flex-col">
        <div className="flex items-center gap-3 border-b border-line px-5 py-3.5">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-surface2 text-steel">
            <User className="h-4 w-4" />
          </span>
          <div>
            <p className="text-sm font-semibold text-white" data-testid="active-conversation-name">{active.name}</p>
            <p className={`flex items-center gap-1.5 text-[11px] ${statusMeta[active.status].cls}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${statusMeta[active.status].dot}`} />
              {statusMeta[active.status].label}
            </p>
          </div>
          {active.tag && <span className="ml-auto rounded-full border border-line px-2.5 py-1 font-mono text-[10px] text-steel">{active.tag}</span>}
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto px-5 py-5" data-testid="chat-messages">
          <AnimatePresence mode="wait">
            <motion.div key={activeId + msgs.length} className="space-y-3" initial={false}>
              {msgs.map((m, i) => (
                <Bubble key={activeId + i} msg={m} i={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <form onSubmit={send} className="flex items-center gap-2 border-t border-line px-4 py-3">
          <input
            data-testid="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escreva uma mensagem de teste…"
            className="flex-1 rounded-xl border border-line bg-ink px-4 py-2.5 text-sm text-white placeholder:text-steel/50 focus:border-teal/40 focus:outline-none"
          />
          <button
            data-testid="chat-send-button"
            type="submit"
            className="grid h-10 w-10 place-items-center rounded-xl bg-teal text-ink transition-colors hover:bg-teal-soft"
            aria-label="Enviar mensagem"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>

      <div className="hidden border-l border-line lg:block">
        <div className="border-b border-line p-4">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-teal">Resumo da Luna</p>
          {summaries[activeId] ? (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs leading-relaxed text-steel" data-testid="ai-summary">
              {active.summary}
            </motion.p>
          ) : (
            <button
              data-testid="generate-summary-button"
              onClick={() => setSummaries((s) => ({ ...s, [activeId]: true }))}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-line bg-surface2 px-3 py-2.5 text-xs text-white transition-colors hover:border-teal/40 hover:text-teal"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Gerar resumo
            </button>
          )}
        </div>
        <div className="space-y-3.5 p-4 text-xs">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-steel">Detalhes</p>
          {[
            ["Nome", active.name],
            ["Telefone", active.phone],
            ["Status", statusMeta[active.status].label],
            ["Início", active.started],
            ["Última ativ.", active.lastActive],
          ].map(([k, v]) => (
            <div key={k} className="flex items-center justify-between gap-2">
              <span className="text-steel/70">{k}</span>
              <span className="text-right text-white/85">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
