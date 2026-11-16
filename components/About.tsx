import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { roles } from "@/lib/content";
import { linkedInUrl } from "@/lib/site";

export function About() {
  return (
    <section id="about" className="bg-offwhite py-20 md:py-28" aria-labelledby="about-title">
      <div className="shell grid items-center gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden bg-navy">
            <Image
              src="/images/about.jpg"
              alt="Contemporary white residential building with deep, precisely aligned windows"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
            <span className="absolute top-4 left-4 h-8 w-px bg-gold" aria-hidden="true" />
            <span className="absolute top-4 left-4 h-px w-8 bg-gold" aria-hidden="true" />
          </div>
        </Reveal>
        <div className="lg:col-span-7">
          <SectionHeading
            eyebrow="About"
            title="Decades of Industry Insight. An Independent Perspective."
            titleId="about-title"
          >
            <p>
              Tommy Savin is a highly experienced Quality Assurance Consultant with a long-standing
              career delivering complex construction and CDM projects.
            </p>
          </SectionHeading>
          <Reveal delay={0.08}>
            <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-muted md:text-lg">
              <p>
                His background includes senior positions as Head of Quality Assurance, Quality
                Control Manager, Senior Clerk of Works and in senior site management. He has worked
                alongside both client-side project teams and main contractors.
              </p>
              <p>
                He now provides independent construction quality assurance and consultancy across
                the United Kingdom. The approach combines strategic quality management with
                practical on-site knowledge: improving workmanship, preventing defects, supporting
                compliance, and helping construction teams make informed decisions.
              </p>
              <p className="font-medium text-navy">Based in London. Available UK-wide.</p>
            </div>
            <ul className="mt-8 grid gap-px bg-line sm:grid-cols-2">
              {roles.map((role) => (
                <li key={role} className="bg-white px-5 py-4 text-sm font-semibold text-navy">
                  {role}
                </li>
              ))}
            </ul>
            <a
              href={linkedInUrl}
              className="btn btn-gold mt-8"
              target="_blank"
              rel="noopener noreferrer"
            >
              Connect with Tommy on LinkedIn
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
