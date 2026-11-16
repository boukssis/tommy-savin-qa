import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { audiences } from "@/lib/content";

export function Audience() {
  return (
    <section className="bg-white py-20 md:py-28" aria-labelledby="audience-title">
      <div className="shell">
        <SectionHeading
          eyebrow="Who we work with"
          title="For the people accountable for quality."
          titleId="audience-title"
        >
          <p>
            The consultancy is intended for organisations and professionals responsible for the
            quality of construction delivery. These are client categories, not a published client
            list.
          </p>
        </SectionHeading>
        <ul className="mt-12 grid md:grid-cols-2 md:gap-x-16">
          {audiences.map((name, index) => (
            <Reveal key={name} delay={index * 0.04}>
              <li className="flex items-baseline justify-between gap-6 border-b border-line py-6">
                <span className="text-2xl font-semibold text-navy md:text-3xl">{name}</span>
                <span className="text-sm text-gold-ink">0{index + 1}</span>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
