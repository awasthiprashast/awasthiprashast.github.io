import { Beyond } from "@/components/Beyond";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Nav } from "@/components/Nav";
import { Projects } from "@/components/Projects";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SectionBand } from "@/components/SectionBand";
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
        <SectionBand n="02" label="Experience" />
        <Experience />
        <SectionBand n="03" label="Projects" reverse />
        <Projects />
        <Marquee />
        <Beyond />
        <SectionBand n="05" label="Toolkit" reverse />
        <Toolkit />
        <SectionBand n="06" label="Contact" />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
