import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { experienceCategories, experienceImages } from "@/lib/content";

function Frame({
  src,
  alt,
  caption,
  className,
  sizes,
}: {
  src: string;
  alt: string;
  caption: string;
  className: string;
  sizes: string;
}) {
  return (
    <figure className={`relative overflow-hidden bg-navy ${className}`}>
      <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-deep via-navy-deep/75 to-transparent px-4 pt-16 pb-4 text-sm text-white">
        {caption}
      </figcaption>
    </figure>
  );
}

export function Experience() {
  const [commercial, structure, craft, residential, facade] = experienceImages;
  if (!commercial || !structure || !craft || !residential || !facade) return null;

  return (
    <section
      id="experience"
      className="bg-navy-deep py-20 text-white md:py-28"
      aria-labelledby="experience-title"
    >
      <div className="shell">
        <SectionHeading
          eyebrow="Experience"
          title="Experience Across Complex, High-Value Construction Projects"
          titleId="experience-title"
          tone="dark"
        >
          <p>
            A career spent inside demanding construction environments, on both the client side and
            with main contractors. The schemes below are previous senior-role experience. They are
            not commissions of this consultancy.
          </p>
        </SectionHeading>

        <Reveal>
          <div className="mt-12 grid gap-8 border border-white/15 p-7 md:p-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-gold">
                Featured experience
              </p>
              <p className="mt-4 text-4xl font-semibold leading-[1.05] md:text-5xl">
                Tottenham Hotspur Stadium
              </p>
              <p className="mt-4 text-lg text-gold">£1 Billion+ Project</p>
            </div>
            <div className="lg:col-span-7 lg:border-l lg:border-white/15 lg:pl-10">
              <p className="text-lg leading-relaxed text-white/80">
                Tommy&apos;s senior construction quality assurance experience includes leading QA on
                the £1bn+ Tottenham Hotspur Stadium project, alongside involvement in other
                technically demanding construction schemes.
              </p>
              <p className="mt-6 text-sm leading-relaxed text-white/55">
                Presented as career experience from a previous senior appointment. It is not a
                current instruction, and it does not imply endorsement or affiliation with the club
                or the project team.
              </p>
            </div>
          </div>
        </Reveal>

        <ul className="mt-4 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-5">
          {experienceCategories.map((item, index) => (
            <li key={item} className="bg-navy-deep px-5 py-6">
              <span className="text-sm text-gold">0{index + 1}</span>
              <p className="mt-4 text-base leading-snug font-medium">{item}</p>
            </li>
          ))}
        </ul>

        <div className="mt-12 grid gap-3 md:grid-cols-12">
          <Frame
            {...commercial}
            className="min-h-[300px] md:col-span-7 md:min-h-[560px]"
            sizes="(min-width: 768px) 58vw, 100vw"
          />
          <div className="grid gap-3 md:col-span-5 md:grid-rows-2">
            <Frame
              {...structure}
              className="min-h-[210px] md:h-full md:min-h-0"
              sizes="(min-width: 768px) 40vw, 100vw"
            />
            <Frame
              {...craft}
              className="min-h-[210px] md:h-full md:min-h-0"
              sizes="(min-width: 768px) 40vw, 100vw"
            />
          </div>
          <Frame
            {...residential}
            className="min-h-[240px] md:col-span-6"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
          <Frame
            {...facade}
            className="min-h-[240px] md:col-span-6"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </div>
        <p className="mt-4 text-sm leading-relaxed text-white/50">
          Photographs illustrate the kinds of construction involved. They are not records of the
          schemes named above, and they are not project photography owned by this consultancy.
        </p>
      </div>
    </section>
  );
}
