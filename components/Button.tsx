type Props = {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
  external?: boolean;
};

export function Button({ href, children, primary, external }: Props) {
  const base =
    "group relative inline-flex items-center gap-1.5 overflow-hidden rounded-full border px-5 py-2.5 text-sm font-medium isolate";
  const tone = primary
    ? "border-accent bg-accent text-on-accent"
    : "border-line-strong text-fg hover:border-accent";
  const sweep = primary ? "bg-fg" : "bg-accent";
  const hoverText = primary ? "group-hover:text-bg" : "group-hover:text-on-accent";
  return (
    <a
      href={href}
      className={`${base} ${tone}`}
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
