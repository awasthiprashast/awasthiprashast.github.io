"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Button } from "./Button";
import { Reveal } from "./Reveal";
import { site } from "@/data/site";

const words = ["solving", "building", "predicting", "securing"];

export function Contact() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setI((v) => (v + 1) % words.length), 2200);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section id="contact" className="py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="mb-4 font-mono text-[11px] tracking-[0.14em] text-dim uppercase">06 · Contact</p>
          <h2 className="font-display text-5xl leading-[1.05] font-medium tracking-tight sm:text-7xl">
            Got a problem
            <br />
            worth{" "}
            <span className="relative inline-block text-accent">
              <span className="invisible">predicting</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={words[i]}
                  className="absolute left-0"
                  initial={{ y: 16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -16, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {words[i]}
                </motion.span>
              </AnimatePresence>
            </span>
            ?
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button primary href={`mailto:${site.email}`}>
              Email me
            </Button>
            <Button href={site.github} external>
              GitHub
            </Button>
            <Button href={site.linkedin} external>
              LinkedIn
            </Button>
            {site.resume && (
              <Button href={site.resume} download={site.resumeFilename}>
                Resume
              </Button>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
