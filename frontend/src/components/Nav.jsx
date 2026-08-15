import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { scrollToSection } from "@/lib/scroll";

const links = [
  { label: "Plataforma", href: "#plataforma" },
  { label: "Demonstração", href: "#demo" },
  { label: "Agendamento", href: "#agendamento" },
  { label: "Marketing", href: "#marketing" },
  { label: "Planos", href: "#planos" },
];

export function Logo({ compact = false }) {
  return (
    <a href="#inicio" data-testid="logo-link" className="group flex items-center gap-2.5" onClick={(e) => go(e, "#inicio")}>
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-teal font-display text-base font-extrabold text-ink transition-transform duration-300 group-hover:rotate-6">
        K
      </span>
      {!compact && <span className="font-display text-lg font-bold tracking-tight text-white">Kromera</span>}
    </a>
  );
}

function go(e, href) {
  e.preventDefault();
  scrollToSection(href);
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${scrolled ? "glass border-b border-line" : "border-b border-transparent"}`}
      data-testid="main-nav"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-8 lg:flex" data-testid="nav-links">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-testid={`nav-link-${l.href.slice(1)}`}
              onClick={(e) => go(e, l.href)}
              className="text-sm text-steel transition-colors duration-300 hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="#contato"
            data-testid="nav-cta-button"
            onClick={(e) => go(e, "#contato")}
            className="group hidden items-center gap-1.5 rounded-full bg-teal px-5 py-2 text-sm font-semibold text-ink transition-all duration-300 hover:bg-teal-soft hover:shadow-[0_0_28px_rgba(0,217,165,0.35)] sm:flex"
          >
            Agendar uma prévia
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <button
            data-testid="nav-mobile-toggle"
            onClick={() => setOpen(!open)}
            className="grid h-9 w-9 place-items-center rounded-lg border border-line text-steel lg:hidden"
            aria-label="Abrir menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="glass overflow-hidden border-b border-line lg:hidden"
            data-testid="nav-mobile-menu"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => {
                    go(e, l.href);
                    setOpen(false);
                  }}
                  className="rounded-lg px-3 py-2.5 text-sm text-steel transition-colors hover:bg-white/5 hover:text-white"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#contato"
                onClick={(e) => {
                  go(e, "#contato");
                  setOpen(false);
                }}
                className="mt-2 rounded-full bg-teal px-5 py-2.5 text-center text-sm font-semibold text-ink"
              >
                Agendar uma prévia
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
