import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Activity } from "lucide-react";
import { metrics, peakHours, engagement, topics } from "@/data/mock";
import { Counter, Reveal } from "@/components/Reveal";

function PeakChart() {
  const [hover, setHover] = useState(null);
  const max = Math.max(...peakHours);
  return (
    <div className="rounded-2xl border border-line bg-surface2/40 p-5" data-testid="peak-hours-chart">
      <p className="mb-4 text-sm font-semibold text-white">Horários de pico</p>
      <div className="flex h-32 items-end gap-[3px]">
        {peakHours.map((v, h) => (
          <div
            key={h}
            className="group relative flex-1"
            onMouseEnter={() => setHover(h)}
            onMouseLeave={() => setHover(null)}
            data-testid={`peak-bar-${h}`}
          >
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: `${(v / max) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: h * 0.02, ease: [0.16, 1, 0.3, 1] }}
              className={`w-full rounded-t-sm transition-colors ${hover === h ? "bg-teal" : v === max ? "bg-teal/80" : "bg-white/10"}`}
              style={{ minHeight: 2 }}
            />
            {hover === h && (
              <div className="absolute -top-9 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md border border-line bg-ink px-2 py-1 font-mono text-[10px] text-white">
                {h}h · {v} conversas
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-between font-mono text-[9px] text-steel/60">
        <span>0h</span><span>6h</span><span>12h</span><span>18h</span><span>23h</span>
      </div>
    </div>
  );
}

function EngagementChart() {
  const [hover, setHover] = useState(null);
  const W = 700, H = 200, PAD = 10;
  const max = Math.max(...engagement.week) * 1.15;
  const pts = engagement.week.map((v, i) => [PAD + (i * (W - 2 * PAD)) / 6, H - PAD - (v / max) * (H - 2 * PAD)]);
  const path = pts.map((p, i) => (i === 0 ? `M ${p[0]} ${p[1]}` : `L ${p[0]} ${p[1]}`)).join(" ");
  const area = `${path} L ${pts[6][0]} ${H - PAD} L ${pts[0][0]} ${H - PAD} Z`;

  return (
    <div className="rounded-2xl border border-line bg-surface2/40 p-5" data-testid="engagement-chart">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-semibold text-white">Engajamento · conversas por dia</p>
        <span className="rounded-full border border-teal/25 bg-teal/5 px-2.5 py-1 font-mono text-[10px] text-teal">Semana</span>
      </div>
      <div className="relative">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
          <defs>
            <linearGradient id="engFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00D9A5" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#00D9A5" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path d={area} fill="url(#engFill)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.5 }} />
          <motion.path
            d={path}
            fill="none"
            stroke="#00D9A5"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          />
          {pts.map((p, i) => (
            <g key={i} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} style={{ cursor: "pointer" }}>
              <circle cx={p[0]} cy={p[1]} r="14" fill="transparent" />
              <circle cx={p[0]} cy={p[1]} r={hover === i ? 6 : 3.5} fill={hover === i ? "#00D9A5" : "#0D0D0F"} stroke="#00D9A5" strokeWidth="2" />
            </g>
          ))}
        </svg>
        {hover !== null && (
          <div
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-md border border-line bg-ink px-2.5 py-1.5 font-mono text-[10px] text-white"
            style={{ left: `${(pts[hover][0] / W) * 100}%`, top: `${(pts[hover][1] / H) * 100 - 4}%` }}
            data-testid="engagement-tooltip"
          >
            {engagement.days[hover]} · {engagement.week[hover]} conversas
          </div>
        )}
      </div>
      <div className="mt-1 flex justify-between font-mono text-[9px] text-steel/60">
        {engagement.days.map((d) => <span key={d}>{d}</span>)}
      </div>
    </div>
  );
}

export default function AnalyticsDemo({ compact = false }) {
  const [analyzed, setAnalyzed] = useState(false);

  return (
    <div className={compact ? "p-5 lg:p-7" : ""} data-testid="analytics-demo">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6">
        {metrics.map((m, i) => (
          <Reveal key={m.label} delay={i * 0.05} className="rounded-2xl border border-line bg-surface2/40 p-4">
            <p className="text-[11px] leading-tight text-steel">{m.label}</p>
            <Counter to={m.value} suffix={m.suffix || ""} className="mt-2 block font-display text-2xl font-extrabold text-white" />
            <p className="mt-1.5 text-[10px] leading-tight text-steel/70">{m.sub}</p>
          </Reveal>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <PeakChart />
        <EngagementChart />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_1.2fr]">
        <div className="rounded-2xl border border-line bg-surface2/40 p-5" data-testid="topics-chart">
          <p className="mb-4 text-sm font-semibold text-white">Tópicos mais frequentes</p>
          <div className="space-y-3">
            {topics.map((t, i) => (
              <div key={t.label}>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="text-steel">{t.label}</span>
                  <span className="font-mono text-teal">{t.value}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/8 bg-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${t.value}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full rounded-full bg-gradient-to-r from-teal/60 to-teal"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-teal/20 bg-teal/[0.03] p-5" data-testid="ai-topic-analysis">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Sparkles className="h-4 w-4 text-teal" />
              <p className="text-sm font-semibold text-white">Análise de tópicos por IA</p>
            </div>
            <span className="font-mono text-[10px] text-steel/60">semanal</span>
          </div>
          {analyzed ? (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4 space-y-2.5 text-xs leading-relaxed text-steel" data-testid="ai-analysis-result">
              <p><span className="text-teal">▸</span> Agendamentos cresceram 22% esta semana - considere abrir mais horários na sexta de manhã.</p>
              <p><span className="text-teal">▸</span> 18% das dúvidas sobre preços foram escalonadas. Atualizar o documento de planos pode reduzir o handoff.</p>
              <p><span className="text-teal">▸</span> Pico de volume às 16h. A Luna resolveu 81% sem intervenção humana nesse horário.</p>
              <p className="border-t border-line pt-3 font-mono text-[10px] text-steel/60">19 mensagens analisadas · última análise 25/07/2026</p>
            </motion.div>
          ) : (
            <div className="mt-4">
              <p className="mb-4 text-xs leading-relaxed text-steel">
                Toda semana, a IA lê suas conversas e transforma volume em direção: o que os clientes mais pedem, onde o bot trava e o que melhorar.
              </p>
              <button
                data-testid="analyze-now-button"
                onClick={() => setAnalyzed(true)}
                className="flex items-center gap-2 rounded-full border border-teal/40 bg-teal/10 px-5 py-2 text-xs font-semibold text-teal transition-colors hover:bg-teal/20"
              >
                <Activity className="h-3.5 w-3.5" />
                Analisar agora
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2 rounded-2xl border border-line bg-surface2/40 px-5 py-4 font-mono text-[10px] text-steel">
        <span>Latência média da Luna: <span className="text-teal">1,2s</span></span>
        <span>Custo de IA no período: <span className="text-white">R$ 84,30</span></span>
        <span>Resumo automático: <span className="text-teal">ativo</span></span>
      </div>
    </div>
  );
}
