import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { benefits } from "@/lib/content";

export function WhyQa() {
  return (
    <section className="bg-offwhite py-20 md:py-28" aria-labelledby="why-title">
      <div className="shell">
        <SectionHeading
          eyebrow="Why independent QA"
          title="Identify Issues Early. Protect Project Quality."
          titleId="why-title"
        >
          <p>
            Independent quality assurance gives project teams an informed view of workmanship and
            process while there is still time to act. It is a commercial discipline as much as a
            technical one. It does not guarantee a defect-free building, and it does not replace
            the contractor’s responsibility for the works.
          </p>
        </SectionHeading>
        <div className="mt-14 grid gap-10 md:grid-cols-2 xl:grid-cols-4">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Reveal key={benefit.title} delay={index * 0.06}>
                <article className="h-full border-t border-gold pt-6">
                  <Icon className="size-6 text-gold-ink" strokeWidth={1.25} aria-hidden="true" />
                  <p className="mt-6 text-sm font-semibold text-gold-ink">0{index + 1}</p>
                  <h3 className="mt-2 text-2xl font-semibold text-navy">{benefit.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{benefit.summary}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
