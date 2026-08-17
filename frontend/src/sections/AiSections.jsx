import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FileText, FileType2, FileCode2, File, HardDrive, Globe, Database,
  MessageSquare, Mic, Image as ImageIcon, ArrowRight, BrainCircuit, Check,
  BookOpen, CalendarPlus, CalendarClock, CalendarX, SendHorizonal, UserRound, Save,
} from "lucide-react";
import { SectionHead, Reveal, Chapter } from "@/components/Reveal";
import { agentSteps, agentTools } from "@/data/mock";

const toolIcons = [BookOpen, CalendarPlus, CalendarClock, CalendarX, SendHorizonal, UserRound, Save];

/* ---------------- RAG ---------------- */

const sources = [
  { icon: FileText, label: "PDF" },
  { icon: FileType2, label: "DOCX" },
  { icon: File, label: "TXT" },
  { icon: FileCode2, label: "Markdown" },
  { icon: HardDrive, label: "Google Drive" },
  { icon: Globe, label: "Website" },
];

function Packet({ delay }) {
  return (
    <motion.span
      className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-teal shadow-[0_0_8px_rgba(0,217,165,0.8)]"
      initial={{ left: "0%", opacity: 0 }}
      animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
      transition={{ duration: 3.2, delay, repeat: Infinity, ease: "linear", times: [0, 0.15, 0.85, 1] }}
    />
  );
}

export function RagSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-28 lg:px-8" data-testid="rag-section">
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHead
            chapter={["03", "Entender"]}
            title={<>A IA que conhece o <span className="text-teal">seu negócio</span>.</>}
            sub="A Luna não inventa respostas. Ela busca no conhecimento real da sua empresa (documentos, site e arquivos), antes de responder qualquer cliente."
          />
          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap gap-2" data-testid="rag-sources">
              {sources.map((s) => (
                <span key={s.label} className="flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-2 text-xs text-steel transition-colors hover:border-teal/40 hover:text-teal">
                  <s.icon className="h-3.5 w-3.5 text-teal" />
                  {s.label}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-8 border-l-2 border-teal pl-4 text-sm italic leading-relaxed text-white/80">
              Respostas fundamentadas no conhecimento real da empresa.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="relative rounded-2xl border border-line bg-surface p-6 lg:p-8" data-testid="rag-pipeline">
            <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2 lg:gap-4">
              <div className="space-y-2.5">
                {["contrato.pdf", "faq.md", "site.com.br"].map((f, i) => (
                  <motion.div
                    key={f}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2.4, delay: i * 0.5, repeat: Infinity }}
                    className="rounded-lg border border-line bg-ink px-3 py-2 font-mono text-[10px] text-steel"
                  >
                    {f}
                  </motion.div>
                ))}
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-teal/60" />
              <motion.div
                animate={{ boxShadow: ["0 0 0 0 rgba(0,217,165,0.25)", "0 0 0 12px rgba(0,217,165,0)", "0 0 0 0 rgba(0,217,165,0.25)"] }}
                transition={{ duration: 2.6, repeat: Infinity }}
                className="mx-auto grid h-20 w-20 place-items-center rounded-2xl border border-teal/30 bg-teal/5"
              >
                <div className="text-center">
                  <Database className="mx-auto h-5 w-5 text-teal" />
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-widest text-teal">RAG</p>
                </div>
              </motion.div>
              <ArrowRight className="h-4 w-4 shrink-0 text-teal/60" />
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 rounded-lg border border-teal/25 bg-teal-deep px-3 py-2">
                  <BrainCircuit className="h-4 w-4 shrink-0 text-teal" />
                  <p className="font-mono text-[10px] text-white/85">Luna</p>
                </div>
                <div className="rounded-lg rounded-tl-sm bg-surface2 px-3 py-2 text-[10px] leading-relaxed text-white/75">
                  "Sim! Atendemos sábados das 9h às 13h."
                </div>
              </div>
            </div>
            <div className="relative mt-6 h-px bg-gradient-to-r from-transparent via-teal/40 to-transparent">
              <Packet delay={0} />
              <Packet delay={1.1} />
              <Packet delay={2.2} />
            </div>
            <p className="mt-4 text-center font-mono text-[10px] text-steel/70">
              Conhecimento → recuperação → resposta fundamentada → cliente
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- AGENT ---------------- */

export function AgentSection() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => setStep((s) => (s + 1) % (agentSteps.length + 2)), 1300);
    return () => clearInterval(iv);
  }, []);

  return (
    <section className="relative py-28" data-testid="agent-section">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_80%_40%,rgba(0,217,165,0.05),transparent)]" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal className="order-2 lg:order-1">
            <div className="rounded-2xl border border-line bg-surface p-6 lg:p-8" data-testid="agent-steps">
              <div className="mb-6 rounded-xl rounded-tl-sm bg-surface2 px-4 py-3 text-sm text-white/85">
                "Gostaria de remarcar meu horário para amanhã."
                <span className="mt-1 block font-mono text-[9px] text-steel/50">cliente · 13:58</span>
              </div>
              <div className="space-y-0">
                {agentSteps.map((s, i) => {
                  const done = step > i;
                  const activeNow = step === i;
                  return (
                    <div key={s.label} className="relative flex gap-4 pb-5 last:pb-0">
                      {i < agentSteps.length - 1 && (
                        <span className={`absolute left-[13px] top-7 h-full w-px transition-colors duration-500 ${done ? "bg-teal/50" : "bg-white/10"}`} />
                      )}
                      <span
                        className={`relative z-10 grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-all duration-500 ${
                          done ? "border-teal bg-teal text-ink" : activeNow ? "border-teal/60 bg-teal/10 text-teal" : "border-line bg-ink text-steel/50"
                        }`}
                      >
                        {done ? <Check className="h-3.5 w-3.5" /> : <span className="font-mono text-[10px]">{i + 1}</span>}
                      </span>
                      <div className={`transition-opacity duration-500 ${done || activeNow ? "opacity-100" : "opacity-40"}`}>
                        <p className={`text-sm font-semibold ${activeNow ? "text-teal" : "text-white"}`}>{s.label}</p>
                        <p className="mt-0.5 text-xs text-steel">{s.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>

          <div className="order-1 lg:order-2">
            <SectionHead
              chapter={["04", "Agir"]}
              title={<>Quando responder não é suficiente, <span className="text-teal">Luna age</span>.</>}
              sub="A Luna é um agente autônomo: ela decide qual ferramenta usar, executa a ação no sistema certo e só então confirma com o cliente. Não é um fluxo engessado - é raciocínio com ferramentas."
            />
            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-wrap gap-2" data-testid="agent-tools">
                {agentTools.map((t, i) => {
                  const Icon = toolIcons[i];
                  return (
                    <span key={t} className="flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-2 text-xs text-steel transition-colors hover:border-teal/40 hover:text-teal">
                      <Icon className="h-3.5 w-3.5 text-teal" />
                      {t}
                    </span>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- OMNI ---------------- */

const omniCards = [
  { icon: MessageSquare, label: "Texto", desc: "Mensagens naturais, gírias e abreviações - a Luna entende intenção, não palavras-chave." },
  { icon: Mic, label: "Voz", desc: "Áudios transcritos com Whisper e respondidos em segundos, como se fossem texto.", voice: true },
  { icon: ImageIcon, label: "Imagem", desc: "Fotos de produtos, comprovantes e prints interpretados por IA com visão." },
  { icon: FileText, label: "Documento", desc: "PDFs e arquivos lidos e compreendidos dentro do contexto da conversa." },
];

export function OmniSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-28 lg:px-8" data-testid="omni-section">
      <SectionHead
        align="center"
        title={<>Seus clientes falam <span className="text-teal">como quiserem</span>.</>}
        sub="Texto, áudio, imagem ou documento - a Luna entende, raciocina sobre o conteúdo e responde com o contexto da conversa."
      />
      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {omniCards.map((c, i) => (
          <Reveal key={c.label} delay={i * 0.08}>
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="group h-full rounded-2xl border border-line bg-surface p-6 transition-colors duration-300 hover:border-teal/35"
              data-testid={`omni-card-${c.label.toLowerCase()}`}
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-teal/10 text-teal">
                {c.voice ? (
                  <div className="flex h-4 items-end gap-[3px]">
                    {[0.6, 1, 0.4, 0.85, 0.55].map((h, j) => (
                      <motion.span
                        key={j}
                        className="w-[3px] rounded-full bg-teal"
                        animate={{ height: [`${h * 40}%`, `${h * 100}%`, `${h * 40}%`] }}
                        transition={{ duration: 1, delay: j * 0.12, repeat: Infinity, ease: "easeInOut" }}
                      />
                    ))}
                  </div>
                ) : (
                  <c.icon className="h-5 w-5" />
                )}
              </div>
              <p className="mt-5 font-display text-lg font-bold text-white">{c.label}</p>
              <p className="mt-2 text-sm leading-relaxed text-steel">{c.desc}</p>
            </motion.div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.3}>
        <div className="mx-auto mt-8 flex max-w-md items-center justify-center gap-3 rounded-full border border-teal/25 bg-teal/[0.05] px-6 py-3" data-testid="omni-converge">
          <span className="text-xs text-steel">tudo converge para</span>
          <span className="flex items-center gap-2 font-display text-sm font-bold text-teal">
            <BrainCircuit className="h-4 w-4" />
            Luna entende → raciocina → responde
          </span>
        </div>
      </Reveal>
    </section>
  );
}
