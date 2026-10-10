import { Download } from "lucide-react";
import { site } from "@/data/site";

/** Icon button next to the Resume (view) button, for visitors who want the file itself. */
export function DownloadResume() {
  if (!site.resume) return null;
  return (
    <a
      href={site.resume}
      download={site.resumeFilename}
      aria-label="Download resume as PDF"
      title="Download PDF"
      className="grid size-[42px] place-items-center rounded-full border border-line-strong text-fg transition-colors hover:border-accent hover:text-accent"
    >
      <Download size={16} aria-hidden />
    </a>
  );
}
