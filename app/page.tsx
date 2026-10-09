import { Beyond } from "@/components/Beyond";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Nav } from "@/components/Nav";
import { Projects } from "@/components/Projects";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SectionStrip } from "@/components/SectionStrip";
import { SideRail } from "@/components/SideRail";
import { Toolkit } from "@/components/Toolkit";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <SideRail />
      <Nav />
      <main>
        <Hero />
        <SectionStrip n="02" label="Experience" />
        <Experience />
        <SectionStrip n="03" label="Projects" />
        <Projects />
        <Marquee />
        <Beyond />
        <SectionStrip n="05" label="Toolkit" />
        <Toolkit />
        <SectionStrip n="06" label="Contact" />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
