import { Reveal, SectionHeading } from "./Reveal";
import { Tag } from "./Tag";
import { beyond } from "@/data/beyond";

export function Beyond() {
  return (
    <section id="beyond" className="border-b border-line py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading index="04" eyebrow="Beyond code">
          Beyond code.
        </SectionHeading>
        <div className="grid gap-4 md:grid-cols-2">
          {beyond.map((b, i) => (
            <Reveal key={b.org} delay={i * 0.08} className="h-full">
              <article className="h-full rounded-xl border border-line bg-surface p-6 transition-colors hover:border-accent">
                <p className="font-mono text-xs text-accent">{b.dates}</p>
                <h3 className="mt-2 font-display text-2xl font-medium tracking-tight">{b.title}</h3>
                <p className="text-sm text-dim">{b.org}</p>
                <p className="mt-4 leading-relaxed text-muted">{b.lead}</p>
                <p className="mt-3 border-t border-line pt-3 text-sm leading-relaxed text-dim">{b.detail}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {b.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
