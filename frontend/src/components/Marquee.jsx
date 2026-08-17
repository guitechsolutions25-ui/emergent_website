const items = [
  "Atendimento 24/7",
  "Automação",
  "Agendamento",
  "Base de conhecimento",
  "CRM 360",
  "Marketing",
  "Analytics",
  "Agente autônomo",
  "Handoff humano",
  "WhatsApp oficial",
];

export default function Marquee() {
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-line bg-ink py-6" data-testid="editorial-marquee">
      <div className="animate-marquee flex w-max items-center">
        {row.map((item, i) => (
          <div key={i} className="flex items-center">
            <span className="whitespace-nowrap font-display text-xl font-semibold tracking-tight text-white/70 md:text-2xl">
              {item}
            </span>
            <span className="mx-8 text-teal/60">◆</span>
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-ink to-transparent" />
    </div>
  );
}
