"use client";

import { Plus } from "lucide-react";
import Image from "next/image";
import { useId, useState } from "react";
import { Cover } from "./Cover";
import { Reveal, SectionHeading } from "./Reveal";
import { Chip, Tag } from "./Tag";
import { projects, type Category, type Project } from "@/data/projects";

const featured = projects.filter((p) => p.featured);
const rest = projects.filter((p) => !p.featured);
const filters: ("All" | Category)[] = ["All", "AI / ML", "Data", "Software", "Privacy"];

function Links({ p }: { p: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {p.note && <Chip>{p.note}</Chip>}
      {p.demoUrl && <Chip href={p.demoUrl}>live demo</Chip>}
      {p.repoUrl && <Chip href={p.repoUrl}>GitHub</Chip>}
    </div>
  );
}

function Shots({ p }: { p: Project }) {
  if (!p.screenshots?.length) return null;
  return (
    <div className="mt-4 grid gap-3 sm:grid-cols-2">
      {p.screenshots.map((s) => (
        <figure key={s.src}>
          <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-line bg-surface-2">
            <Image
              src={s.src}
              alt={s.alt}
              fill
              sizes="(min-width: 1024px) 400px, 90vw"
              className="object-cover object-top"
            />
          </div>
          {s.caption && <figcaption className="mt-1.5 text-xs text-dim">{s.caption}</figcaption>}
        </figure>
      ))}
    </div>
  );
}

function FeaturedCard({ p, n }: { p: Project; n: number }) {
  const shot = p.screenshots?.[0];
  return (
    <Reveal delay={n * 0.08} className="h-full">
      <article
        className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface p-4 transition-all duration-300 hover:-translate-y-1 hover:border-accent"
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
          e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
        }}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(180px circle at var(--mx,50%) var(--my,50%), color-mix(in srgb, var(--accent) 14%, transparent), transparent 70%)",
          }}
        />
        <div className="relative flex flex-1 flex-col">
          {shot ? (
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-line bg-surface-2">
              <Image src={shot.src} alt={shot.alt} fill sizes="(min-width: 1024px) 380px, 90vw" className="object-cover object-top" />
              <span className="absolute bottom-2 left-2 rounded bg-bg/70 px-1.5 py-0.5 font-mono text-[9px] text-dim">
                real screenshot
              </span>
            </div>
          ) : (
            p.cover && <Cover kind={p.cover} />
          )}
          <p className="mt-4 font-mono text-xs text-accent">{String(n + 1).padStart(2, "0")}</p>
          <h3 className="mt-1 font-display text-xl font-medium tracking-tight">{p.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{p.summary}</p>
          <div className="mt-3 border-t border-line pt-3 text-xs leading-relaxed text-dim">
            {p.built && (
              <p>
                <b className="font-medium text-fg">Built with</b> {p.built}
              </p>
            )}
            {p.notable && (
              <p className="mt-2">
                <b className="font-medium text-fg">Notable:</b> {p.notable}
              </p>
            )}
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {p.tech.slice(0, 6).map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
          <div className="mt-auto pt-4">
            <Links p={p} />
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function Row({ p, n, open, onToggle }: { p: Project; n: number; open: boolean; onToggle: () => void }) {
  const id = useId();
  return (
    <li className="group border-t border-line last:border-b">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={onToggle}
        className="grid w-full grid-cols-[2rem_1fr_auto] items-center gap-3 py-4 text-left sm:grid-cols-[2rem_1fr_auto_1.5rem]"
      >
        <span className="font-mono text-xs text-dim">{String(n).padStart(2, "0")}</span>
        <span>
          <span className="block font-display text-lg font-medium transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-accent">
            {p.title}
          </span>
          <span className="mt-0.5 block text-xs text-dim">{p.tech.join(" · ")}</span>
        </span>
        <span className="hidden sm:block">{p.note && <Chip>{p.note}</Chip>}</span>
        <Plus
          size={18}
          aria-hidden
          className={`justify-self-end text-accent transition-transform duration-300 ${open ? "rotate-45" : ""}`}
        />
      </button>
      <div
        id={id}
        inert={!open}
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          <div className="max-w-3xl space-y-2 pr-2 pb-5 pl-11 text-sm leading-relaxed text-muted">
            <p>{p.summary}</p>
            {p.built && (
              <p className="text-dim">
                <b className="font-medium text-fg">Built with</b> {p.built}
              </p>
            )}
            {p.notable && (
              <p className="text-dim">
                <b className="font-medium text-fg">Notable:</b> {p.notable}
              </p>
            )}
            <Shots p={p} />
            <div className="pt-2">
              <Links p={p} />
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<"All" | Category>("All");
  const [openSet, setOpenSet] = useState<Set<string>>(new Set());

  const visible = rest.filter((p) => filter === "All" || p.categories.includes(filter));
  const allOpen = visible.length > 0 && visible.every((p) => openSet.has(p.slug));

  function toggle(slug: string) {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  }

  return (
    <section id="projects" className="border-b border-line py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading index="03" eyebrow="Projects">
          Projects.
        </SectionHeading>

        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((p, i) => (
            <FeaturedCard key={p.slug} p={p} n={i} />
          ))}
        </div>

        <div className="mt-16 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] tracking-[0.14em] text-dim uppercase">
              More projects ({rest.length})
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5" role="group" aria-label="Filter projects">
              {filters.map((f) => (
                <button
                  key={f}
                  type="button"
                  aria-pressed={filter === f}
                  onClick={() => setFilter(f)}
                  className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                    filter === f
                      ? "border-fg bg-fg text-bg"
                      : "border-line-strong text-muted hover:border-accent hover:text-fg"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOpenSet(allOpen ? new Set() : new Set(visible.map((p) => p.slug)))}
            className="rounded-full border border-line-strong px-4 py-1.5 text-xs text-fg transition-colors hover:border-accent hover:text-accent"
          >
            {allOpen ? "Collapse all" : "Expand all"}
          </button>
        </div>

        <ul className="mt-4">
          {visible.map((p) => (
            <Row
              key={p.slug}
              p={p}
              n={featured.length + rest.indexOf(p) + 1}
              open={openSet.has(p.slug)}
              onToggle={() => toggle(p.slug)}
            />
          ))}
        </ul>
        {visible.length === 0 && <p className="py-6 text-sm text-dim">No projects in this category.</p>}
      </div>
    </section>
  );
}
