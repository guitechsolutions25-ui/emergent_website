import { Check, ArrowUpRight, Mail } from "lucide-react";
import { SectionHead, Reveal } from "@/components/Reveal";
import { plans } from "@/data/mock";
import { Logo } from "@/components/Nav";
import { scrollToSection } from "@/lib/scroll";

export function PricingSection() {
  return (
    <section id="planos" className="mx-auto max-w-7xl px-5 py-28 lg:px-8" data-testid="pricing-section">
      <SectionHead
        align="center"
        title={<>Planos para cada <span className="text-teal">estágio</span>.</>}
        sub="Comece pela automação e evolua para a inteligência completa. Sem taxa de setup escondida."
      />
      <div className="mt-14 grid gap-5 lg:grid-cols-3" data-testid="pricing-grid">
        {plans.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.1}>
            <div
              className={`relative flex h-full flex-col rounded-2xl border p-7 transition-colors duration-300 lg:p-8 ${
                p.highlight
                  ? "border-teal/50 bg-teal/[0.05] shadow-[0_0_50px_rgba(0,217,165,0.12)] lg:-translate-y-3"
                  : "border-line bg-surface hover:border-white/20"
              }`}
              data-testid={`plan-card-${p.name.toLowerCase()}`}
            >
              {p.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-teal px-4 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-ink">
                  Mais escolhido
                </span>
              )}
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-steel">{p.name}</p>
              <div className="mt-4 flex items-baseline gap-1.5">
                <span className={`font-display text-4xl font-extrabold tracking-tight ${p.highlight ? "text-teal" : "text-white"}`}>{p.price}</span>
                <span className="text-sm text-steel">{p.period}</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-steel">{p.desc}</p>
              <ul className="mt-7 flex-1 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-white/80">
                    <Check className={`mt-0.5 h-4 w-4 shrink-0 ${p.highlight ? "text-teal" : "text-teal/70"}`} />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#contato"
                data-testid={`plan-cta-${p.name.toLowerCase()}`}
                onClick={(e) => { e.preventDefault(); scrollToSection("#contato"); }}
                className={`mt-8 rounded-full py-3 text-center font-display text-sm font-bold transition-all duration-300 ${
                  p.highlight
                    ? "bg-teal text-ink hover:bg-teal-soft hover:shadow-[0_0_30px_rgba(0,217,165,0.4)]"
                    : "border border-line text-white hover:border-teal/40 hover:text-teal"
                }`}
              >
                Começar com {p.name}
              </a>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section id="contato" className="relative overflow-hidden py-32 lg:py-40" data-testid="final-cta">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_50%_100%,rgba(0,217,165,0.09),transparent)]" />
      <div className="relative mx-auto max-w-4xl px-5 text-center lg:px-8">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-teal">Próximo passo</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 font-display text-4xl font-extrabold leading-[1.08] tracking-[-0.02em] text-white sm:text-5xl lg:text-6xl">
            Ainda tem dúvidas sobre como podemos transformar seu atendimento?
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-steel md:text-lg">
            Agende uma prévia e veja, na prática, como a Kromera pode atender seus clientes pelo WhatsApp.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-col items-center gap-5">
            <a
              href="mailto:guilherme@kromera.com?subject=Quero%20agendar%20uma%20pr%C3%A9via%20da%20Kromera"
              data-testid="final-cta-button"
              className="group inline-flex items-center gap-2.5 rounded-full bg-teal px-9 py-4 font-display text-base font-bold text-ink transition-all duration-300 hover:bg-teal-soft hover:shadow-[0_0_50px_rgba(0,217,165,0.45)]"
            >
              Agendar uma prévia
              <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="mailto:guilherme@kromera.com"
              data-testid="contact-email-link"
              className="flex items-center gap-2 font-mono text-sm text-steel transition-colors hover:text-teal"
            >
              <Mail className="h-4 w-4" />
              guilherme@kromera.com
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line py-10" data-testid="footer">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-5 sm:flex-row lg:px-8">
        <Logo />
        <p className="font-mono text-[11px] text-steel/60">Atender → Entender → Agir → Organizar → Analisar</p>
        <p className="text-xs text-steel/60">© 2026 Kromera. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
