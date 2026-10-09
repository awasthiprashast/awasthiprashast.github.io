"use client";

import { motion } from "motion/react";
import { Reveal, SectionHeading } from "./Reveal";
import { Tag } from "./Tag";
import { experience } from "@/data/experience";

export function Experience() {
  return (
    <section id="experience" className="border-b border-line py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading index="02" eyebrow="Experience">
          Experience.
        </SectionHeading>
        <div className="relative pl-8 sm:pl-10">
          <motion.span
            aria-hidden
            className="absolute top-2 bottom-2 left-[5px] w-px origin-top bg-accent"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          />
          <ol className="space-y-14">
            {experience.map((e, i) => (
              <li key={e.company} className="relative">
                <span
                  aria-hidden
                  className="absolute top-2 -left-8 size-[11px] rounded-full border border-accent bg-bg sm:-left-10"
                />
                <Reveal delay={i * 0.05}>
                  <p className="font-mono text-xs text-dim">
                    {e.dates} · {e.place}
                  </p>
                  <h3 className="mt-1 font-display text-2xl font-medium tracking-tight sm:text-3xl">
                    {e.role} · <span className="text-accent">{e.company}</span>
                  </h3>
                  <ul className="mt-4 max-w-3xl list-disc space-y-2 pl-5 leading-relaxed text-muted marker:text-dim">
                    {e.points.map((p) => (
                      <li key={p} className="transition-colors hover:text-fg">
                        {p}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {e.tech.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
