import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image, Type, CheckCircle2, Clock, PencilLine, Users, RotateCcw } from "lucide-react";
import { templates, audiences, campaigns } from "@/data/mock";
import { Counter } from "@/components/Reveal";

const statusChip = {
  Aprovado: "border-teal/30 bg-teal/10 text-teal",
  "Em análise": "border-amber-400/30 bg-amber-400/10 text-amber-300",
  Enviada: "border-teal/30 bg-teal/10 text-teal",
  Agendada: "border-sky-400/30 bg-sky-400/10 text-sky-300",
  Rascunho: "border-line bg-white/5 text-steel",
};

function PhonePreview({ tpl }) {
  return (
    <div className="mx-auto w-[280px] rounded-[1.75rem] border border-line bg-ink p-2.5 shadow-2xl" data-testid="template-phone-preview">
      <div className="rounded-[1.4rem] bg-[#0B141A] p-3">
        <div className="mb-3 flex items-center gap-2 border-b border-white/5 pb-2.5">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-teal font-display text-[11px] font-bold text-ink">K</span>
          <div>
            <p className="text-[11px] font-semibold text-white">Sua Empresa</p>
            <p className="font-mono text-[8px] text-teal">online · via Luna</p>
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={tpl.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            {tpl.header === "Imagem" && (
              <div className="mb-2 grid h-24 place-items-center rounded-xl bg-gradient-to-br from-teal/25 to-teal-deep">
                <Image className="h-6 w-6 text-teal/70" />
              </div>
            )}
            <div className="rounded-xl rounded-tl-sm bg-[#1F2C34] p-3">
              <p className="text-[11px] leading-relaxed text-white/85">{tpl.body.replace("{{1}}", "Marina").replace("{{2}}", "sexta-feira").replace("{{3}}", "09:00")}</p>
              <p className="mt-1.5 text-right font-mono text-[8px] text-white/30">09:00 ✓✓</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function CampaignsDemo() {
  const [tab, setTab] = useState("templates");
  const [tplId, setTplId] = useState("t1");
  const [simTpl, setSimTpl] = useState(null);
  const [simAud, setSimAud] = useState(null);
  const [phase, setPhase] = useState("idle");
  const [progress, setProgress] = useState(0);

  const tpl = templates.find((t) => t.id === tplId);
  const audience = audiences.find((a) => a.id === simAud);

  useEffect(() => {
    if (phase === "scheduled") {
      const t = setTimeout(() => setPhase("sending"), 2200);
      return () => clearTimeout(t);
    }
    if (phase === "sending") {
      setProgress(0);
      const start = Date.now();
      const iv = setInterval(() => {
        const p = Math.min(100, ((Date.now() - start) / 2600) * 100);
        setProgress(p);
        if (p >= 100) {
          clearInterval(iv);
          setPhase("sent");
        }
      }, 40);
      return () => clearInterval(iv);
    }
  }, [phase]);

  const resetSim = () => {
    setPhase("idle");
    setSimTpl(null);
    setSimAud(null);
    setProgress(0);
  };

  return (
    <div className="p-5 lg:p-7" data-testid="campaigns-demo">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3 rounded-xl border border-line bg-surface2/60 px-4 py-3">
          <Users className="h-4 w-4 text-teal" />
          <p className="text-sm text-steel">
            <span className="font-display text-lg font-bold text-white">1.284</span> clientes com opt-in ativo
          </p>
        </div>
        <div className="flex gap-1 rounded-xl border border-line p-1">
          {["templates", "campanhas"].map((t) => (
            <button
              key={t}
              data-testid={`campaigns-tab-${t}`}
              onClick={() => setTab(t)}
              className={`rounded-lg px-4 py-2 text-sm capitalize transition-colors ${tab === t ? "bg-teal/10 text-teal" : "text-steel hover:text-white"}`}
            >
              {t === "templates" ? "Templates" : "Campanhas"}
            </button>
          ))}
        </div>
      </div>

      {tab === "templates" ? (
        <div className="grid gap-6 lg:grid-cols-[1fr_auto]">
          <div className="space-y-3">
            {templates.map((t) => (
              <button
                key={t.id}
                data-testid={`template-card-${t.id}`}
                onClick={() => setTplId(t.id)}
                className={`w-full rounded-xl border p-4 text-left transition-all duration-300 ${tplId === t.id ? "border-teal/40 bg-teal/[0.05]" : "border-line bg-surface2/40 hover:border-white/15"}`}
              >
                <div className="flex flex-wrap items-center gap-2.5">
                  <p className="font-display text-sm font-semibold text-white">{t.label}</p>
                  <span className={`rounded-full border px-2 py-0.5 text-[10px] ${statusChip[t.status]}`}>{t.status}</span>
                  <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] text-steel">
                    {t.header === "Imagem" ? <Image className="h-3 w-3" /> : <Type className="h-3 w-3" />}
                    {t.header}
                  </span>
                </div>
                <p className="mt-1.5 font-mono text-[10px] text-steel/60">{t.category} · Template oficial WhatsApp</p>
                <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-steel">{t.body}</p>
              </button>
            ))}
          </div>
          <PhonePreview tpl={tpl} />
        </div>
      ) : (
        <div className="space-y-6">
          <div className="space-y-2.5">
            {campaigns.map((c) => (
              <div key={c.id} className="flex flex-wrap items-center gap-3 rounded-xl border border-line bg-surface2/40 px-4 py-3.5" data-testid={`campaign-row-${c.id}`}>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white">{c.name}</p>
                  <p className="mt-0.5 font-mono text-[10px] text-steel/70">
                    {c.template} · {c.audience}
                  </p>
                </div>
                {c.status === "Enviada" && (
                  <div className="flex gap-4 font-mono text-[10px] text-steel">
                    <span><span className="text-white">{c.sent}</span> enviadas</span>
                    <span><span className="text-teal">{c.delivered}</span> entregues</span>
                  </div>
                )}
                {c.when && <span className="font-mono text-[10px] text-sky-300">{c.when}</span>}
                <span className={`rounded-full border px-2.5 py-1 text-[10px] ${statusChip[c.status]}`}>{c.status}</span>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-teal/20 bg-teal/[0.03] p-5" data-testid="campaign-simulator">
            <div className="mb-4 flex items-center justify-between">
              <p className="font-display text-sm font-bold text-white">Simular nova campanha</p>
              {phase !== "idle" && (
                <button data-testid="campaign-reset-button" onClick={resetSim} className="flex items-center gap-1.5 text-xs text-steel transition-colors hover:text-white">
                  <RotateCcw className="h-3 w-3" /> Recomeçar
                </button>
              )}
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              <div>
                <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-steel">1 · Template</p>
                <div className="space-y-1.5">
                  {templates.filter((t) => t.status === "Aprovado").map((t) => (
                    <button
                      key={t.id}
                      data-testid={`sim-template-${t.id}`}
                      onClick={() => setSimTpl(t.id)}
                      className={`w-full rounded-lg border px-3 py-2 text-left text-xs transition-colors ${simTpl === t.id ? "border-teal/50 bg-teal/10 text-teal" : "border-line text-steel hover:text-white"}`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-steel">2 · Público (opt-in)</p>
                <div className="space-y-1.5">
                  {audiences.map((a) => (
                    <button
                      key={a.id}
                      data-testid={`sim-audience-${a.id}`}
                      onClick={() => setSimAud(a.id)}
                      className={`w-full rounded-lg border px-3 py-2 text-left text-xs transition-colors ${simAud === a.id ? "border-teal/50 bg-teal/10 text-teal" : "border-line text-steel hover:text-white"}`}
                    >
                      {a.name} <span className="float-right font-mono text-[10px] opacity-70">{a.count}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-col">
                <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-steel">3 · Envio</p>
                <div className="flex flex-1 flex-col justify-center rounded-lg border border-line bg-ink/40 p-4">
                  {phase === "idle" && (
                    <button
                      data-testid="campaign-launch-button"
                      disabled={!simTpl || !simAud}
                      onClick={() => setPhase("scheduled")}
                      className="rounded-full bg-teal px-5 py-2.5 text-sm font-semibold text-ink transition-all enabled:hover:bg-teal-soft disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      Agendar envio
                    </button>
                  )}
                  {phase === "scheduled" && (
                    <div className="text-center" data-testid="campaign-status-scheduled">
                      <Clock className="mx-auto mb-2 h-5 w-5 animate-pulse text-sky-300" />
                      <p className="text-xs text-sky-300">Campanha agendada</p>
                      <p className="mt-1 font-mono text-[10px] text-steel">iniciando em instantes…</p>
                    </div>
                  )}
                  {phase === "sending" && (
                    <div data-testid="campaign-status-sending">
                      <p className="mb-2 flex justify-between text-xs text-white">
                        <span>Enviando…</span>
                        <span className="font-mono text-teal">{Math.round(progress)}%</span>
                      </p>
                      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                        <div className="h-full rounded-full bg-teal transition-[width]" style={{ width: `${progress}%` }} />
                      </div>
                    </div>
                  )}
                  {phase === "sent" && audience && (
                    <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="text-center" data-testid="campaign-status-sent">
                      <CheckCircle2 className="mx-auto mb-2 h-6 w-6 text-teal" />
                      <p className="text-sm font-semibold text-white">Campanha enviada</p>
                      <div className="mt-3 grid grid-cols-3 gap-2 font-mono text-[10px] text-steel">
                        <div><Counter to={audience.count} className="block text-base font-bold text-white" />enviadas</div>
                        <div><Counter to={Math.round(audience.count * 0.94)} className="block text-base font-bold text-teal" />entregues</div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
            <p className="mt-4 flex items-center gap-2 font-mono text-[10px] text-steel/60">
              <PencilLine className="h-3 w-3" /> Simulação com dados fictícios - nenhuma mensagem real é enviada.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
