type Props = {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
  external?: boolean;
  /** Filename to save as. Makes the link a same-site download instead of opening a new tab. */
  download?: string;
  size?: "md" | "sm";
  onClick?: () => void;
};

export function Button({ href, children, primary, external, download, size = "md", onClick }: Props) {
  const pad = size === "sm" ? "px-3.5 py-1.5 text-xs" : "px-5 py-2.5 text-sm";
  const base = `group relative inline-flex items-center gap-1.5 overflow-hidden rounded-full border font-medium isolate ${pad}`;
  const tone = primary
    ? "border-accent bg-accent text-on-accent"
    : "border-line-strong text-fg hover:border-accent";
  const sweep = primary ? "bg-fg" : "bg-accent";
  const hoverText = primary ? "group-hover:text-bg" : "group-hover:text-on-accent";
  return (
    <a
      href={href}
      onClick={onClick}
      className={`${base} ${tone}`}
      {...(download ? { download } : {})}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span
        aria-hidden
        className={`absolute inset-0 -z-10 translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0 ${sweep}`}
      />
      <span className={`relative transition-colors duration-300 ${hoverText}`}>{children}</span>
    </a>
  );
}
