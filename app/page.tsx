import { About } from "@/components/About";
import { Approach } from "@/components/Approach";
import { Audience } from "@/components/Audience";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Faq } from "@/components/Faq";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { SiteBand } from "@/components/SiteBand";
import { Technology } from "@/components/Technology";
import { WhyQa } from "@/components/WhyQa";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <SiteBand />
      <Experience />
      <WhyQa />
      <Approach />
      <Technology />
      <Audience />
      <Faq />
      <Contact />
    </>
  );
}
