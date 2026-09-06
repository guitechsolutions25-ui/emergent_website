import { Link } from "react-router-dom";
import { Check, ArrowUpRight, Mail } from "lucide-react";
import { SectionHead, Reveal } from "@/components/Reveal";
import { trialHighlights } from "@/data/mock";
import { Logo } from "@/components/Nav";
import { scrollToSection } from "@/lib/scroll";

export function FreeTrialSection() {
  return (
    <section id="comece-gratis" className="mx-auto max-w-7xl px-5 py-28 lg:px-8" data-testid="free-trial-section">
      <SectionHead
        align="center"
        title={<>Comece <span className="text-teal">grátis</span>.</>}
        sub="Sem planos fechados nem letras miúdas: use a Kromera na sua operação real antes de decidir qualquer coisa."
      />
      <Reveal delay={0.15}>
        <div
          className="relative mx-auto mt-14 max-w-3xl rounded-3xl border border-teal/40 bg-teal/[0.05] p-9 text-center shadow-[0_0_60px_rgba(0,217,165,0.14)] lg:p-14"
          data-testid="free-trial-card"
        >
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-teal px-4 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-ink">
            Sem cartão de crédito
          </span>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-teal">Oferta de lançamento</p>
          <h3 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Comece grátis
          </h3>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-steel md:text-lg">
            Teste por 60 dias grátis, sem cartão de crédito e sem compromisso. Coloque a Luna para atender seus clientes de verdade e veja, com dados, o quanto ela resolve.
          </p>
          <ul className="mx-auto mt-9 grid max-w-lg gap-3 text-left sm:grid-cols-2">
            {trialHighlights.map((h) => (
              <li key={h} className="flex items-start gap-2.5 text-sm text-white/80">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                {h}
              </li>
            ))}
          </ul>
          <a
            href="#contato"
            data-testid="free-trial-cta"
            onClick={(e) => { e.preventDefault(); scrollToSection("#contato"); }}
            className="group mt-10 inline-flex items-center gap-2 rounded-full bg-teal px-8 py-3.5 font-display text-sm font-bold text-ink transition-all duration-300 hover:bg-teal-soft hover:shadow-[0_0_40px_rgba(0,217,165,0.4)]"
          >
            Quero testar grátis
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <p className="mx-auto mt-6 max-w-md font-mono text-[11px] leading-relaxed text-steel/70">
            Ao fim do teste, montamos juntos um plano sob medida para o volume real do seu atendimento.
          </p>
        </div>
      </Reveal>
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
        <div className="flex items-center gap-5">
          <Link to="/termos-e-privacidade" data-testid="footer-legal-link" className="text-xs text-steel/60 transition-colors hover:text-teal">
            Termos e Privacidade
          </Link>
          <p className="text-xs text-steel/60">© 2026 Kromera. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
