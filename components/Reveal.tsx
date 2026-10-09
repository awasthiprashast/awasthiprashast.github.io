"use client";

import { motion } from "motion/react";

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.6, delay, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  index,
  eyebrow,
  children,
}: {
  index: string;
  eyebrow: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-10">
      <Reveal>
        <p className="mb-4 font-mono text-[11px] tracking-[0.14em] text-dim uppercase">
          {index} · {eyebrow}
        </p>
      </Reveal>
      <h2 className="-mb-2 overflow-hidden pb-2 font-display text-5xl leading-[1.02] font-medium tracking-tight sm:text-7xl">
        <motion.span
          className="block"
          initial={{ y: "105%" }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
        >
          {children}
        </motion.span>
      </h2>
    </div>
  );
}
