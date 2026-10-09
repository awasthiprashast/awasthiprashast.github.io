import { marquee } from "@/data/skills";

export function Marquee() {
  const items = [...marquee, ...marquee];
  return (
    <div aria-hidden className="marquee overflow-hidden border-b border-line py-5 whitespace-nowrap">
      <div className="marquee-track inline-flex gap-9 font-display text-2xl font-medium tracking-tight sm:text-3xl">
        {items.map((t, i) => (
          <span key={i} className={i % 3 === 2 ? "text-accent" : "text-line-strong"}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
