import { Year } from "./Year";
import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-6 text-xs text-dim sm:px-8">
        <p>
          © <Year /> {site.name}
        </p>
        <a href="#top" className="transition-colors hover:text-accent">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
