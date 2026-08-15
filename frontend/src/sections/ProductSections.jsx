import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarCheck, Check, RotateCcw, MessageSquare, StickyNote, User,
  ArrowRight, ShieldCheck, FileText, Link2, Calendar,
} from "lucide-react";
import { SectionHead, Reveal } from "@/components/Reveal";
import { timelineEvents } from "@/data/mock";

/* ---------------- SCHEDULING ---------------- */

const slots = [
  { time: "08:30", free: false },
  { time: "09:00", free: true },
  { time: "10:30", free: true },
  { time: "14:00", free: false },
  { time: "15:30", free: true },
  { time: "16:30", free: true },
];

const rules = ["Agendar", "Remarcar", "Cancelar", "Horário comercial", "Regras de disponibilidade", "Políticas de cancelamento"];

export function SchedulingSection() {
  const [picked, setPicked] = useState(null);
  const [confirming, setConfirming] = useState(false);

  const pick = (t) => {
    setPicked(t);
    setConfirming(true);
    setTimeout(() => setConfirming(false), 900);
  };

  return (
    <section id="agendamento" className="mx-auto max-w-7xl px-5 py-28 lg:px-8" data-testid="scheduling-section">
      <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHead
            chapter={["05", "Agir"]}
            title={<>Agendamento que <span className="text-teal">se resolve sozinho</span>.</>}
            sub="O cliente pede, a Luna consulta a agenda real, aplica suas regras e confirma — com lembrete automático e sincronização com o Google Calendar."
          />
          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap gap-2">
              {rules.map((r) => (
                <span key={r} className="rounded-full border border-line bg-surface px-3.5 py-2 text-xs text-steel">
                  {r}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.28}>
            <div className="mt-6 flex flex-wrap gap-4 font-mono text-[11px] text-steel">
              <span className="flex items-center gap-2"><Calendar className="h-3.5 w-3.5 text-teal" /> Google Calendar</span>
              <span className="flex items-center gap-2"><Link2 className="h-3.5 w-3.5 text-teal" /> Links externos de reserva</span>
            </div>
          </Reveal>

          <Reveal delay={0.34}>
            <div className="mt-10 space-y-3 rounded-2xl border border-line bg-surface p-5" data-testid="scheduling-chat">
              <div className="flex justify-start">
                <p className="max-w-[75%] rounded-2xl rounded-bl-sm bg-surface2 px-4 py-3 text-sm text-white/85">
                  Quero marcar uma consulta para sexta.
                </p>
              </div>
              <div className="flex justify-end">
                <div className="max-w-[80%] rounded-2xl rounded-br-sm border border-teal/25 bg-teal-deep px-4 py-3 text-sm text-white/90">
                  <p className="mb-1 font-mono text-[10px] text-teal">Luna</p>
                  <p>Claro! Estes são os horários livres na sexta-feira. Toque em um horário ao lado para confirmar:</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="rounded-2xl border border-line bg-surface p-6" data-testid="scheduling-calendar">
            <div className="mb-5 flex items-center justify-between">
              <p className="font-display text-sm font-bold text-white">Agenda · Sexta, 25/07</p>
              <span className="flex items-center gap-2 font-mono text-[10px] text-teal">
                <span className="h-1.5 w-1.5 rounded-full bg-teal animate-pulse-dot" />
                sincronizada
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2.5">
              {slots.map((s) => (
                <button
                  key={s.time}
                  data-testid={`slot-${s.time.replace(":", "")}`}
                  disabled={!s.free || (picked && confirming)}
                  onClick={() => s.free && pick(s.time)}
                  className={`rounded-xl border py-3.5 font-mono text-sm transition-all duration-300 ${
                    picked === s.time
                      ? "border-teal bg-teal text-ink shadow-[0_0_20px_rgba(0,217,165,0.3)]"
                      : s.free
                        ? "border-teal/30 bg-teal/[0.06] text-teal hover:bg-teal/15"
                        : "cursor-not-allowed border-line bg-ink text-steel/40 line-through"
                  }`}
                >
                  {s.time}
                </button>
              ))}
            </div>
            <div className="mt-3 flex gap-4 font-mono text-[10px] text-steel/60">
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-teal/60" /> disponível</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-zinc-700" /> ocupado</span>
            </div>

            <AnimatePresence>
              {picked && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-5 rounded-xl border border-teal/30 bg-teal/[0.06] p-4"
                  data-testid="appointment-confirmed"
                >
                  {confirming ? (
                    <p className="flex items-center gap-2 text-sm text-teal">
                      <motion.span animate={{ rotate: 360 }} transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}>
                        <RotateCcw className="h-4 w-4" />
                      </motion.span>
                      Confirmando na agenda…
                    </p>
                  ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <p className="flex items-center gap-2 font-display text-sm font-bold text-white">
                        <span className="grid h-6 w-6 place-items-center rounded-full bg-teal text-ink">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                        Agendamento confirmado
                      </p>
                      <p className="mt-2 text-xs text-steel">Sexta-feira, 25/07 às {picked} · Dra. Helena</p>
                      <div className="mt-3 flex flex-wrap gap-2 font-mono text-[10px]">
                        <span className="rounded-full border border-teal/25 bg-teal/10 px-2.5 py-1 text-teal">Google Calendar atualizado</span>
                        <span className="rounded-full border border-teal/25 bg-teal/10 px-2.5 py-1 text-teal">Lembrete agendado</span>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- CRM 360 ---------------- */

const timelineIcons = { conversa: MessageSquare, agendamento: CalendarCheck, nota: StickyNote };

export function CrmSection() {
  const [active, setActive] = useState(0);
  const ev = timelineEvents[active];

  return (
    <section className="relative py-28" data-testid="crm-section">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_20%_50%,rgba(0,217,165,0.05),transparent)]" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid items-start gap-14 lg:grid-cols-[380px_1fr] lg:gap-20">
          <div>
            <SectionHead
              chapter={["06", "Organizar"]}
              title={<>Cada cliente em <span className="text-teal">um único lugar</span>.</>}
              sub="Conversas, agendamentos, notas internas e atividade — o histórico completo do cliente, sempre a um clique."
            />
            <Reveal delay={0.2}>
              <div className="mt-8 rounded-2xl border border-line bg-surface p-5" data-testid="crm-profile-card">
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-teal-dim font-display text-base font-bold text-teal">MC</span>
                  <div>
                    <p className="font-display text-base font-bold text-white">Marina Costa</p>
                    <p className="font-mono text-[10px] text-steel">+55 11 98765-4321</p>
                  </div>
                  <span className="ml-auto rounded-full border border-teal/30 bg-teal/10 px-2.5 py-1 text-[10px] text-teal">opt-in ativo</span>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  {[["14", "conversas"], ["3", "agendamentos"], ["6m", "cliente há"]].map(([v, l]) => (
                    <div key={l} className="rounded-xl border border-line bg-ink/50 py-3">
                      <p className="font-display text-lg font-bold text-teal">{v}</p>
                      <p className="text-[9px] text-steel">{l}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="rounded-2xl border border-line bg-surface p-6" data-testid="crm-timeline">
              <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.2em] text-steel">Linha do tempo do cliente</p>
              <div>
                {timelineEvents.map((t, i) => {
                  const Icon = timelineIcons[t.type];
                  const isActive = active === i;
                  return (
                    <button
                      key={i}
                      data-testid={`timeline-event-${i}`}
                      onClick={() => setActive(i)}
                      className="relative flex w-full gap-4 pb-6 text-left last:pb-0"
                    >
                      {i < timelineEvents.length - 1 && (
                        <span className={`absolute left-[15px] top-8 h-full w-px ${isActive ? "bg-teal/50" : "bg-white/10"}`} />
                      )}
                      <span className={`relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                        isActive ? "border-teal bg-teal/15 text-teal" : "border-line bg-ink text-steel"
                      }`}>
                        <Icon className="h-3.5 w-3.5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center justify-between gap-2">
                          <span className={`text-sm font-semibold transition-colors ${isActive ? "text-teal" : "text-white"}`}>{t.title}</span>
                          <span className="shrink-0 font-mono text-[10px] text-steel/60">{t.date}</span>
                        </span>
                        {isActive && (
                          <motion.span
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="mt-1.5 block text-xs leading-relaxed text-steel"
                          >
                            {t.detail}
                          </motion.span>
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- HANDOFF ---------------- */

const chain = ["Luna", "Escala", "Atendente", "Cliente"];

export function HandoffSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-28 lg:px-8" data-testid="handoff-section">
      <SectionHead
        align="center"
        title={<>Quando é hora de um humano assumir, <span className="text-teal">Luna sabe</span>.</>}
        sub="A IA não substitui sua equipe — ela prepara o caminho. O atendente recebe a conversa com resumo, contexto e histórico. Nunca do zero."
      />

      <Reveal delay={0.15}>
        <div className="relative mx-auto mt-14 max-w-3xl" data-testid="handoff-chain">
          <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-teal/40 to-transparent" />
          <motion.span
            className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-teal shadow-[0_0_10px_rgba(0,217,165,0.9)]"
            animate={{ left: ["2%", "98%"], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear", times: [0, 0.1, 0.9, 1] }}
          />
          <div className="relative grid grid-cols-4 gap-2">
            {chain.map((c, i) => (
              <div key={c} className="flex flex-col items-center gap-2.5">
                <span className={`grid h-12 w-12 place-items-center rounded-2xl border font-display text-sm font-bold ${
                  i === 0 ? "border-teal/40 bg-teal/10 text-teal" : i === 1 ? "border-amber-400/40 bg-amber-400/10 text-amber-300" : "border-line bg-surface text-white"
                }`}>
                  {c[0]}
                </span>
                <span className="text-xs text-steel">{c}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-center gap-3">
            <span className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-[11px] text-steel">Escala por pedido do cliente</span>
            <span className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-[11px] text-steel">Escala por regra de negócio</span>
          </div>
        </div>
      </Reveal>

      <div className="mt-12 grid gap-4 lg:grid-cols-2">
        <Reveal delay={0.2}>
          <div className="h-full rounded-2xl border border-line bg-surface p-6" data-testid="handoff-inbox">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-steel">Inbox ao vivo · Atendente Rafael</p>
            <div className="space-y-3">
              <div className="flex justify-end">
                <div className="max-w-[85%] rounded-2xl rounded-br-sm border border-amber-400/25 bg-amber-400/10 px-4 py-3 text-sm text-white/90">
                  <p className="mb-1 font-mono text-[10px] text-amber-300">Rafael</p>
                  Oi João, a Luna me passou o contexto. Vamos revisar seu contrato — segue a minuta atualizada.
                  <span className="mt-2 flex items-center gap-2 rounded-lg border border-white/10 bg-ink/50 px-3 py-2 font-mono text-[10px] text-white/70">
                    <FileText className="h-3.5 w-3.5 text-teal" /> minuta-contrato-v3.pdf
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 pl-1 text-xs text-steel">
                <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.4, repeat: Infinity }}>
                  João está digitando…
                </motion.span>
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.28}>
          <div className="h-full rounded-2xl border border-teal/20 bg-teal/[0.04] p-6" data-testid="handoff-summary">
            <p className="mb-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-teal">
              <ShieldCheck className="h-4 w-4" /> Resumo gerado pela Luna
            </p>
            <ul className="space-y-2.5 text-sm leading-relaxed text-white/80">
              <li className="flex gap-2.5"><ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-teal" /> Cliente queria reagendar, mas mudou para assunto comercial.</li>
              <li className="flex gap-2.5"><ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-teal" /> Regra acionada: "contrato" exige atendente humano.</li>
              <li className="flex gap-2.5"><ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-teal" /> Histórico: 6 conversas, 1 agendamento ativo, cliente desde mar/2026.</li>
              <li className="flex gap-2.5"><ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-teal" /> Sugestão: oferecer renovação anual com condição fidelizada.</li>
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
