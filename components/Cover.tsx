import type { Project } from "@/data/projects";

const stroke = "var(--accent)";
const soft = "var(--line-strong)";
const dot = "var(--point)";

/** Drawn illustrations for projects without a real screenshot. Always labelled as illustrative. */
export function Cover({ kind }: { kind: NonNullable<Project["cover"]> }) {
  return (
    <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-surface-2">
      <svg viewBox="0 0 320 180" className="size-full" role="img" aria-label="Illustration, not a screenshot">
        {kind === "pipeline" && (
          <g>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <g key={i}>
                {i < 5 && <path d={`M${40 + i * 48} 90 L${40 + (i + 1) * 48} 90`} stroke={soft} strokeWidth="1.5" />}
                <circle cx={40 + i * 48} cy="90" r={i === 5 ? 8 : 6} fill={i % 2 ? dot : stroke} />
              </g>
            ))}
            {[40, 70, 110, 140].map((y, i) => (
              <path key={i} d={`M12 ${y} L34 ${88 + (i - 1.5) * 1.5}`} stroke={soft} strokeWidth="1" strokeDasharray="2 3" />
            ))}
            <rect x="262" y="60" width="44" height="60" rx="4" fill="none" stroke={stroke} strokeWidth="1.2" />
            <path d="M270 76h28M270 88h28M270 100h18" stroke={stroke} strokeWidth="1.2" />
          </g>
        )}
        {kind === "eye" && (
          <g>
            <ellipse cx="160" cy="90" rx="82" ry="34" fill="none" stroke={stroke} strokeWidth="1.3" />
            <circle cx="160" cy="90" r="17" fill="none" stroke={stroke} strokeWidth="1.3" />
            <circle cx="160" cy="90" r="6" fill={stroke} />
            {[[84, 90], [110, 66], [210, 66], [236, 90], [110, 114], [210, 114]].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="2.5" fill={dot} />
            ))}
            <path d="M246 90h52M14 90h54" stroke={soft} strokeWidth="1.2" strokeDasharray="3 4" />
          </g>
        )}
        {kind === "swipe" && (
          <g>
            <rect x="96" y="34" width="108" height="118" rx="10" fill="var(--surface-2)" stroke={soft} transform="rotate(-9 150 93)" />
            <rect x="116" y="30" width="108" height="118" rx="10" fill="var(--surface)" stroke={stroke} strokeWidth="1.3" transform="rotate(5 170 89)" />
            <path d="M138 70h54M138 86h40M138 102h48" stroke={soft} strokeWidth="2" strokeLinecap="round" transform="rotate(5 170 89)" />
            <path d="M248 90h34m-8-8 8 8-8 8" fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
            <path d="M72 90H38m8-8-8 8 8 8" fill="none" stroke={soft} strokeWidth="1.5" strokeLinecap="round" />
          </g>
        )}
      </svg>
      <span className="absolute bottom-2 left-2 rounded bg-bg/70 px-1.5 py-0.5 font-mono text-[9px] text-dim">
        illustrative
      </span>
    </div>
  );
}
