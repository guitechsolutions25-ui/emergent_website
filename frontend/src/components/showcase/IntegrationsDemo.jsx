import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Calendar, HardDrive, Globe, Loader2 } from "lucide-react";
import { integrations as seed } from "@/data/mock";
import { StatusDot } from "@/components/Reveal";

const icons = { wa: MessageCircle, gcal: Calendar, gdrive: HardDrive, site: Globe };

export default function IntegrationsDemo() {
  const [items, setItems] = useState(seed);
  const [openId, setOpenId] = useState("wa");
  const [connecting, setConnecting] = useState(false);

  const connect = (id) => {
    setConnecting(true);
    setItems((ls) => ls.map((i) => (i.id === id ? { ...i, status: "Sincronizando", detail: "Conectando e indexando páginas…" } : i)));
    setTimeout(() => {
      setItems((ls) => ls.map((i) => (i.id === id ? { ...i, status: "Conectado", detail: "38 páginas indexadas · rastreio diário ativo" } : i)));
      setConnecting(false);
    }, 2400);
  };

  return (
    <div className="p-5 lg:p-7" data-testid="integrations-demo">
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((it) => {
          const Icon = icons[it.id];
          const open = openId === it.id;
          return (
            <button
              key={it.id}
              data-testid={`integration-card-${it.id}`}
              onClick={() => setOpenId(open ? null : it.id)}
              className={`rounded-2xl border p-5 text-left transition-all duration-300 ${open ? "border-teal/35 bg-teal/[0.04]" : "border-line bg-surface2/40 hover:border-white/15"}`}
            >
              <div className="flex items-start justify-between gap-3">
                <span className={`grid h-10 w-10 place-items-center rounded-xl transition-colors ${open ? "bg-teal/15 text-teal" : "bg-ink text-steel"}`}>
                  <Icon className="h-5 w-5" />
                </span>
                <span className="flex items-center gap-2 rounded-full border border-line px-2.5 py-1 text-[10px] text-steel">
                  <StatusDot status={it.status} />
                  {it.status}
                </span>
              </div>
              <p className="mt-4 font-display text-sm font-bold text-white">{it.name}</p>
              <p className="mt-0.5 text-xs text-steel">{it.desc}</p>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="mt-3 border-t border-line pt-3 font-mono text-[10px] leading-relaxed text-steel">{it.detail}</p>
                    {it.status === "Sincronizando" && (
                      <div className="mt-2 flex items-center gap-2 text-[10px] text-sky-300">
                        <Loader2 className="h-3 w-3 animate-spin" /> sincronização em andamento
                      </div>
                    )}
                    {it.id === "site" && it.status === "Não conectado" && (
                      <span
                        role="button"
                        data-testid="integration-connect-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!connecting) connect("site");
                        }}
                        className="mt-3 inline-block cursor-pointer rounded-full bg-teal px-4 py-1.5 text-[11px] font-semibold text-ink transition-colors hover:bg-teal-soft"
                      >
                        {connecting ? "Conectando…" : "Conectar agora"}
                      </span>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </div>
      <p className="mt-5 text-center text-xs text-steel/70">A Kromera se conecta aos sistemas que a sua empresa já usa — sem troca de ferramentas.</p>
    </div>
  );
}
