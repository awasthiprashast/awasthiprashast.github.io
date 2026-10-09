export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md bg-surface-2 px-2 py-0.5 font-mono text-[11px] text-muted transition-colors hover:bg-accent hover:text-on-accent">
      {children}
    </span>
  );
}

export function Chip({
  children,
  href,
}: {
  children: React.ReactNode;
  href?: string;
}) {
  const cls =
    "inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[10px]";
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${cls} border-accent bg-accent text-on-accent transition-opacity hover:opacity-80`}
      >
        {children} ↗
      </a>
    );
  }
  return <span className={`${cls} border-line-strong text-muted`}>{children}</span>;
}
