import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/Providers";
import { site } from "@/data/site";
import "./globals.css";

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600"],
});
const body = Geist({ variable: "--font-body", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono-var", subsets: ["latin"] });

const description =
  "Portfolio of Prashast Awasthi, a computer science student at VIT Vellore working on data science, applied AI and backend engineering.";

export const metadata: Metadata = {
  title: `${site.name} · Data, AI and backend engineering`,
  description,
  openGraph: {
    title: site.name,
    description,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#101211",
};

// Applies the saved theme before first paint to avoid a flash.
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
