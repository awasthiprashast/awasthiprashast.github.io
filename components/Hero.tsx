"use client";

import { motion } from "motion/react";
import { Button } from "./Button";
import { DownloadResume } from "./DownloadResume";
import { PointField } from "./PointField";
import { site } from "@/data/site";

function Word({ text, start, accent }: { text: string; start: number; accent?: boolean }) {
  return (
    <span className={`block overflow-hidden pb-[0.08em] ${accent ? "text-accent" : ""}`} aria-hidden>
      {[...text].map((c, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: start + i * 0.04, ease: [0.2, 0.8, 0.2, 1] }}
        >
          {c}
        </motion.span>
      ))}
    </span>
  );
}

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.2, 0.8, 0.2, 1] as const },
});

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-line">
      <div className="relative mx-auto max-w-[1400px]">
      <div className="absolute inset-y-0 right-0 w-full opacity-25 md:w-[52%] md:opacity-100">
        <PointField />
      </div>
      <div className="relative flex min-h-[calc(100svh-3.5rem)] flex-col justify-center px-5 py-20 sm:px-8">
        <motion.p
          {...fade(0)}
          className="mb-4 font-mono text-[11px] tracking-[0.14em] text-dim uppercase"
        >
          01 · About
        </motion.p>
        <motion.p {...fade(0.05)} className="text-muted">
          Hi, I&rsquo;m
        </motion.p>
        <h1
          aria-label={site.name}
          className="mt-1 font-display text-[clamp(3.5rem,11vw,8rem)] leading-[0.95] 2xl:text-[10rem] font-medium tracking-[-0.04em]"
        >
          <Word text={site.firstName} start={0.1} accent />
          <Word text={site.lastName} start={0.45} />
        </h1>
        <motion.p {...fade(0.9)} className="mt-6 max-w-md text-lg leading-relaxed text-muted">
          {site.tagline}
        </motion.p>
        <motion.div {...fade(1)} className="mt-8 flex flex-wrap gap-3">
          <Button primary href="#experience">
            See my experience
          </Button>
          {site.resume && (
            <Button href={site.resume} external>
              Resume
            </Button>
          )}
            <DownloadResume />
        </motion.div>
        <motion.dl
          {...fade(1.1)}
          className="mt-10 flex flex-wrap gap-x-10 gap-y-4 text-sm text-muted"
        >
          <div>
            <dt className="font-mono text-[10px] tracking-widest text-dim uppercase">Education</dt>
            <dd>{site.education}</dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] tracking-widest text-dim uppercase">Focus</dt>
            <dd>{site.focus}</dd>
          </div>
        </motion.dl>
      </div>
      </div>
    </section>
  );
}
