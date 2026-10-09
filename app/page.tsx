import { Beyond } from "@/components/Beyond";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Nav } from "@/components/Nav";
import { Projects } from "@/components/Projects";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Toolkit } from "@/components/Toolkit";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <Experience />
        <Projects />
        <Marquee />
        <Beyond />
        <Toolkit />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
