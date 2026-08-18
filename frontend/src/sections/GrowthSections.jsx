import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, ChevronRight } from "lucide-react";
import { SectionHead, Reveal, Counter } from "@/components/Reveal";
import { marketingSteps, tourItems } from "@/data/mock";
import AnalyticsDemo from "@/components/showcase/AnalyticsDemo";
import IntegrationsDemo from "@/components/showcase/IntegrationsDemo";

/* ---------------- MARKETING ---------------- */

const chips = ["Templates oficiais da Meta", "Gestão de opt-in", "Envio em massa", "Campanhas agendadas", "Log de entrega", "Cabeçalho texto · imagem · vídeo · documento"];

export function MarketingSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const iv = setInterval(() => setActive((a) => (a + 1) % marketingSteps.length), 2600);
    return () => clearInterval(iv);
  }, [paused]);

  return (
    <section id="marketing" className="relative py-28" data-testid="marketing-section">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_50%_at_50%_0%,rgba(0,217,165,0.05),transparent)]" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHead
          chapter={["07", "Divulgar"]}
          title={<>Marketing no WhatsApp, <span className="text-teal">do jeito certo</span>.</>}
          sub="Campanhas com templates oficiais, apenas para clientes com opt-in, com agendamento e acompanhamento de entrega em tempo real."
        />

        <Reveal delay={0.15}>
          <div
            className="mt-14 rounded-2xl border border-line bg-surface p-6 lg:p-8"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            data-testid="marketing-stepper"
          >
            <div className="relative">
              <div className="absolute left-0 right-0 top-[22px] h-px bg-white/10" />
              <motion.div
                className="absolute left-0 top-[22px] h-px bg-teal"
                animate={{ width: `${(active / (marketingSteps.length - 1)) * 100}%` }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />
              <div className="relative grid grid-cols-3 gap-y-6 sm:grid-cols-6">
                {marketingSteps.map((s, i) => (
                  <button
                    key={s.label}
                    data-testid={`marketing-step-${i}`}
                    onClick={() => setActive(i)}
                    className="group flex flex-col items-center gap-2.5"
                  >
                    <span className={`grid h-11 w-11 place-items-center rounded-full border font-mono text-xs transition-all duration-500 ${
                      i < active
                        ? "border-teal bg-teal text-ink"
                        : i === active
                          ? "border-teal bg-teal/15 text-teal shadow-[0_0_20px_rgba(0,217,165,0.3)]"
                          : "border-line bg-ink text-steel/60 group-hover:border-white/25"
                    }`}>
                      {i < active ? <Check className="h-4 w-4" /> : i + 1}
                    </span>
                    <span className={`text-center text-[11px] leading-tight transition-colors ${i === active ? "text-teal" : "text-steel"}`}>
                      {s.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-8 rounded-xl border border-line bg-ink/50 p-5 text-center"
              data-testid="marketing-step-detail"
            >
              <p className="text-sm text-white/85">{marketingSteps[active].desc}</p>
            </motion.div>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {chips.map((c) => (
                <span key={c} className="rounded-full border border-line px-3 py-1.5 text-[11px] text-steel">{c}</span>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mt-8 grid grid-cols-3 gap-3 text-center" data-testid="marketing-metrics">
            {[["128", "enviadas"], ["121", "entregues"]].map(([v, l]) => (
              <div key={l} className="rounded-2xl border border-line bg-surface px-4 py-5">
                <Counter to={Number(v)} className="font-display text-3xl font-extrabold text-teal" />
                <p className="mt-1 text-xs text-steel">{l} · última campanha</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- ANALYTICS ---------------- */

export function AnalyticsSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-28 lg:px-8" data-testid="analytics-section">
      <SectionHead
        chapter={["08", "Analisar"]}
        title={<>Cada conversa vira <span className="text-teal">inteligência</span>.</>}
        sub="Volume, resolução, escalonamento, horários de pico e tópicos analisados por IA toda semana. Passe o mouse sobre os gráficos para explorar."
      />
      <Reveal delay={0.15}>
        <div className="mt-14 rounded-2xl border border-line bg-surface p-5 lg:p-7">
          <AnalyticsDemo />
        </div>
      </Reveal>
    </section>
  );
}

/* ---------------- INTEGRATIONS ---------------- */

export function IntegrationsSection() {
  return (
    <section className="mx-auto max-w-5xl px-5 py-28 lg:px-8" data-testid="integrations-section">
      <SectionHead
        align="center"
        title={<>Conectada ao que você <span className="text-teal">já usa</span>.</>}
        sub="WhatsApp Business Cloud API, Google Calendar e Google Drive integrados nativamente. Clique nos cards para ver o status de cada conexão."
      />
      <Reveal delay={0.15}>
        <div className="mt-14 rounded-2xl border border-line bg-surface">
          <IntegrationsDemo />
        </div>
      </Reveal>
    </section>
  );
}

/* ---------------- PLATFORM TOUR ---------------- */

export function PlatformTour() {
  const [active, setActive] = useState("mensagens");
  const item = tourItems.find((t) => t.id === active);

  return (
    <section className="mx-auto max-w-7xl px-5 py-28 lg:px-8" data-testid="platform-tour">
      <SectionHead
        chapter={["09", "O ecossistema"]}
        title={<>Uma plataforma, <span className="text-teal">nove frentes</span>.</>}
        sub="Do atendimento ao relatório executivo: navegue pelos módulos que compõem a Kromera."
      />

      <div className="mt-14 grid gap-4 lg:grid-cols-[260px_1fr]">
        <Reveal className="min-w-0 rounded-2xl border border-line bg-surface p-2.5">
          <div className="flex gap-1.5 overflow-x-auto lg:flex-col lg:overflow-visible" data-testid="tour-nav">
            {tourItems.map((t) => (
              <button
                key={t.id}
                data-testid={`tour-item-${t.id}`}
                onClick={() => setActive(t.id)}
                className={`flex shrink-0 items-center justify-between gap-2 rounded-xl px-4 py-3 text-left text-sm transition-all duration-300 ${
                  active === t.id ? "bg-teal/10 text-teal" : "text-steel hover:bg-white/[0.03] hover:text-white"
                }`}
              >
                {t.label}
                <ChevronRight className={`h-3.5 w-3.5 transition-transform duration-300 ${active === t.id ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0"}`} />
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="grid h-full gap-6 rounded-2xl border border-line bg-surface p-7 lg:grid-cols-[1fr_260px] lg:p-9"
            data-testid="tour-panel"
          >
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-teal">Painel Luna</p>
              <h3 className="mt-3 font-display text-2xl font-extrabold text-white lg:text-3xl">{item.label}</h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-steel lg:text-base">{item.desc}</p>
              <div className="mt-8">
                <p className="font-display text-4xl font-extrabold text-teal">{item.stat}</p>
                <p className="mt-1 text-xs text-steel">{item.statLabel}</p>
              </div>
            </div>
            <div className="hidden flex-col justify-center gap-2.5 rounded-xl border border-line bg-ink/60 p-4 lg:flex">
              <div className="h-2 w-3/4 rounded bg-white/10" />
              <div className="h-2 w-1/2 rounded bg-teal/40" />
              <div className="h-2 w-2/3 rounded bg-white/10" />
              <div className="mt-2 h-16 rounded-lg border border-teal/20 bg-gradient-to-br from-teal/15 to-transparent" />
              <div className="h-2 w-1/3 rounded bg-white/10" />
              <div className="h-2 w-1/2 rounded bg-white/10" />
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
