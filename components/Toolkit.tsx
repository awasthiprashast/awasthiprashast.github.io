import { Reveal, SectionHeading } from "./Reveal";
import { skills } from "@/data/skills";

export function Toolkit() {
  return (
    <section id="toolkit" className="border-b border-line py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading index="05" eyebrow="Toolkit">
          Toolkit.
        </SectionHeading>
        <dl>
          {skills.map((s, i) => (
            <Reveal key={s.group} delay={i * 0.04}>
              <div className="group grid gap-1 border-t border-line py-4 transition-all duration-300 last:border-b hover:pl-2 sm:grid-cols-[13rem_1fr] sm:gap-6">
                <dt className="font-display text-lg font-medium transition-colors group-hover:text-accent">{s.group}</dt>
                <dd className="leading-relaxed text-muted">{s.items.join(" · ")}</dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
