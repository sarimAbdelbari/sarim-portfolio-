import Hero from "@/components/sections/hero";
import AboutMe from "@/components/sections/aboutMe";
import Contact from "@/components/sections/contact";
import LineSeparator from "@/components/layout/lineSperator";
import Projects from "@/components/sections/projects";
import Blog from "@/components/sections/blog";

export default function Home() {
  return (
   <div className="flex flex-col gap-8">
    <section id="home">
      <Hero/>
    </section>
    <LineSeparator variant="dashed" showDot={true} />
    <section id="about">
      <AboutMe/>
    </section>
    <LineSeparator variant="dashed" showDot={true} />
    <section id="projects">
      <Projects/>
    </section>
    {/* <LineSeparator variant="dashed" showDot={true} />
    <section id="skills">
      <Skills/>
    </section> */}
    <LineSeparator variant="dashed" showDot={true} />
    <section id="blog">
      <Blog/>
    </section>
    <LineSeparator variant="dashed" showDot={true} />
    <section id="contact">
      <Contact/>
    </section>
   </div>
  );
}
