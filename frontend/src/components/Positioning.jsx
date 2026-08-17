import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { SectionHead, Reveal } from "@/components/Reveal";
import { capabilities } from "@/data/mock";

export default function Positioning() {
  const [open, setOpen] = useState(0);

  return (
    <section id="plataforma" className="relative mx-auto max-w-7xl px-5 py-28 lg:px-8 lg:py-36" data-testid="positioning-section">
      <div className="grid gap-14 lg:grid-cols-[1fr_1.25fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHead
            chapter={["01", "Atender"]}
            title={<>Seu WhatsApp pode fazer <span className="text-teal">muito mais</span>.</>}
            sub="A Luna não é um chatbot de respostas prontas. É uma camada de inteligência sobre o WhatsApp que atende, entende, age e organiza: Dentro de uma única plataforma."
          />
          <Reveal delay={0.2}>
            <div className="mt-10 hidden gap-6 lg:flex">
              <div className="rounded-xl border border-line bg-surface px-5 py-4">
                <p className="font-display text-2xl font-bold text-teal">10+</p>
                <p className="mt-1 text-xs text-steel">capacidades nativas</p>
              </div>
              <div className="rounded-xl border border-line bg-surface px-5 py-4">
                <p className="font-display text-2xl font-bold text-teal">1</p>
                <p className="mt-1 text-xs text-steel">plataforma completa</p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="flex flex-col" data-testid="capabilities-list">
          {capabilities.map((cap, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={cap.title} delay={i * 0.04}>
                <button
                  data-testid={`capability-item-${i}`}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className={`group w-full border-b border-line py-5 text-left transition-colors duration-300 ${isOpen ? "" : "hover:bg-white/[0.02]"}`}
                >
                  <div className="flex items-center gap-5">
                    <span className={`font-mono text-xs transition-colors duration-300 ${isOpen ? "text-teal" : "text-steel/50"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={`flex-1 font-display text-lg font-semibold tracking-tight transition-colors duration-300 md:text-xl ${isOpen ? "text-white" : "text-white/70 group-hover:text-white"}`}>
                      {cap.title}
                    </span>
                    <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.3 }}>
                      <Plus className={`h-4 w-4 transition-colors duration-300 ${isOpen ? "text-teal" : "text-steel/50"}`} />
                    </motion.span>
                  </div>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pl-10 pt-3 text-sm leading-relaxed text-steel md:text-base">{cap.desc}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
