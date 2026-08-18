import { Component, Suspense, lazy, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowDown, CalendarCheck, Wifi } from "lucide-react";
import { scrollToSection } from "@/lib/scroll";

const Spline = lazy(() => import("@splinetool/react-spline"));

const EASE = [0.16, 1, 0.3, 1];

// react-spline throws during render when the scene fails to load (e.g. a
// network hiccup or an ad/privacy blocker cutting off prod.spline.design).
// Without this boundary that throw propagates past Suspense and unmounts
// the entire app, not just the hero visual, so a purely decorative asset
// can take the whole site down. Swallow it and render nothing instead.
class SplineBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function MaskedLine({ children, delay }) {
  return (
    <span className="block overflow-hidden pb-1">
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.1, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function FloatCard({ className, delay, duration, children, testid }) {
  return (
    <motion.div
      data-testid={testid}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, delay, ease: EASE }}
      className={`pointer-events-none absolute z-20 hidden xl:block ${className}`}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
        className="glass rounded-2xl border border-line p-4 shadow-2xl shadow-black/50"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yContent = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const orbY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const orbOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.15]);

  const splineAppRef = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // The orb is a live WebGL render loop with no reason to keep running
    // once scrolled out of view, on any screen size. Pause/resume it via
    // Spline's own play()/stop() API rather than unmounting -- unmounting
    // would retrigger Auto Zoom's fit calculation and the Start-event
    // state transition, which previously caused the orb to reset/reframe
    // each time it scrolled back in.
    const observer = new IntersectionObserver(
      ([entry]) => {
        const app = splineAppRef.current;
        if (!app) return;
        if (entry.isIntersecting) app.play();
        else app.stop();
      },
      { rootMargin: "200px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="inicio" ref={ref} className="relative flex min-h-screen items-center overflow-hidden" data-testid="hero-section">
      <motion.div style={{ y: orbY, opacity: orbOpacity }} className="absolute inset-0 z-[5]">
        <div
          className="spline-hero"
          style={{
            WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 22%)",
            maskImage: "linear-gradient(90deg, transparent 0%, black 22%)",
            filter: "brightness(1.4) saturate(1.2)",
          }}
        >
          <div className="spline-hero-zoom">
            <SplineBoundary>
              <Suspense fallback={null}>
                <Spline
                  scene="https://prod.spline.design/G4NwmAwpjFy4Iuwx/scene.splinecode"
                  onLoad={(app) => { splineAppRef.current = app; }}
                />
              </Suspense>
            </SplineBoundary>
          </div>
        </div>
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-ink/55 lg:bg-[linear-gradient(90deg,#0D0D0F_0%,rgba(13,13,15,0.92)_30%,rgba(13,13,15,0.5)_50%,transparent_64%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink/80 to-transparent" />

      <FloatCard className="right-[10%] top-[24%]" delay={1.6} duration={6} testid="hero-float-chat">
        <div className="flex items-start gap-3">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-teal-dim font-display text-xs font-bold text-teal">L</span>
          <div>
            <p className="text-xs text-white">Consulta confirmada para sexta, 09:00 ✓</p>
            <p className="mt-1 font-mono text-[10px] text-steel">Luna · agora mesmo</p>
          </div>
        </div>
      </FloatCard>

      <FloatCard className="right-[26%] top-[58%]" delay={1.9} duration={7} testid="hero-float-calendar">
        <div className="flex items-center gap-3">
          <CalendarCheck className="h-4 w-4 text-teal" />
          <div>
            <p className="text-xs font-medium text-white">Agendamento automático</p>
            <p className="font-mono text-[10px] text-steel">Google Calendar sincronizado</p>
          </div>
        </div>
      </FloatCard>

      <FloatCard className="right-[7%] top-[74%]" delay={2.2} duration={5.5} testid="hero-float-status">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-teal" />
          </span>
          <Wifi className="h-3.5 w-3.5 text-teal" />
          <p className="font-mono text-[10px] text-white">WhatsApp conectado</p>
        </div>
      </FloatCard>

      <motion.div style={{ y: yContent, opacity }} className="pointer-events-none relative z-10 mx-auto w-full max-w-7xl px-5 pb-28 pt-36 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
          className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-teal/25 bg-teal/5 px-4 py-1.5"
          data-testid="hero-badge"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-teal animate-pulse-dot" />
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-teal">Luna · IA para WhatsApp</span>
        </motion.div>

        <h1 className="max-w-3xl font-display text-[2.9rem] font-extrabold leading-[1.02] tracking-[-0.03em] text-white sm:text-6xl lg:text-7xl" data-testid="hero-headline">
          <MaskedLine delay={0.65}>Transforme seu</MaskedLine>
          <MaskedLine delay={0.78}>atendimento</MaskedLine>
          <MaskedLine delay={0.91}>
            com a <span className="text-teal text-glow">Kromera</span>
          </MaskedLine>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.25, ease: EASE }}
          className="mt-7 max-w-xl text-base leading-relaxed text-steel md:text-lg"
          data-testid="hero-subheadline"
        >
          Muito além de um assistente virtual — uma plataforma completa para automatizar e potencializar a comunicação com seus clientes pelo WhatsApp.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.45, ease: EASE }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#demo"
            data-testid="hero-cta-primary"
            onClick={(e) => { e.preventDefault(); scrollToSection("#demo"); }}
            className="group pointer-events-auto inline-flex items-center gap-2 rounded-full bg-teal px-7 py-3.5 font-display text-sm font-bold text-ink transition-all duration-300 hover:bg-teal-soft hover:shadow-[0_0_40px_rgba(0,217,165,0.4)]"
          >
            Conheça a Luna
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href="#plataforma"
            data-testid="hero-cta-secondary"
            onClick={(e) => { e.preventDefault(); scrollToSection("#plataforma"); }}
            className="inline-flex items-center gap-2 rounded-full border border-line px-7 py-3.5 font-display text-sm font-semibold text-white transition-colors duration-300 hover:border-teal/40 hover:text-teal"
          >
            Explorar a plataforma
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="mt-14 flex flex-wrap gap-x-10 gap-y-4 font-mono text-[11px] uppercase tracking-[0.18em] text-steel"
          data-testid="hero-stats"
        >
          <span><span className="text-teal">78%</span> resolução autônoma</span>
          <span><span className="text-teal">24/7</span> atendimento contínuo</span>
          <span><span className="text-teal">1,2s</span> resposta média</span>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <ArrowDown className="h-4 w-4 text-steel" />
        </motion.div>
      </motion.div>
    </section>
  );
}
