import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

export const EASE = [0.16, 1, 0.3, 1];

export function Reveal({ children, delay = 0, y = 28, className }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Chapter({ num, label }) {
  return (
    <Reveal>
      <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-teal" data-testid={`chapter-${num}`}>
        <span className="text-steel">{num}</span>
        <span className="h-px w-10 bg-teal/40" />
        <span>{label}</span>
      </div>
    </Reveal>
  );
}

export function SectionHead({ chapter, title, sub, align = "left" }) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      {chapter && (
        <div className={align === "center" ? "flex justify-center" : ""}>
          <Chapter num={chapter[0]} label={chapter[1]} />
        </div>
      )}
      <Reveal delay={0.08}>
        <h2 className="mt-5 font-display text-4xl font-extrabold tracking-[-0.02em] leading-[1.05] text-white sm:text-5xl">
          {title}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.16}>
          <p className={`mt-5 max-w-2xl text-base leading-relaxed text-steel md:text-lg ${align === "center" ? "mx-auto" : ""}`}>
            {sub}
          </p>
        </Reveal>
      )}
    </div>
  );
}

export function Counter({ to, suffix = "", prefix = "", decimals = 0, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: EASE,
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [inView, to]);
  return (
    <span ref={ref} className={className}>
      {prefix}
      {val.toFixed(decimals).replace(".", ",")}
      {suffix}
    </span>
  );
}

export function StatusDot({ status }) {
  const colors = {
    Conectado: "bg-teal animate-pulse-dot",
    Sincronizando: "bg-sky-400 animate-pulse",
    "Não conectado": "bg-zinc-600",
  };
  return <span className={`inline-block h-2 w-2 rounded-full ${colors[status] || "bg-zinc-600"}`} />;
}
