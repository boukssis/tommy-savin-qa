import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { services } from "@/lib/content";

export function Services() {
  return (
    <section id="services" className="bg-white py-20 md:py-28" aria-labelledby="services-title">
      <div className="shell">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Services"
            title="Independent support across the quality of delivery."
            titleId="services-title"
          >
            <p>
              Practical consultancy for project teams who need clear oversight, disciplined
              inspection and straightforward advice. Each service is shaped around the project, the
              contract and the risks that matter.
            </p>
          </SectionHeading>
          <Link href="/#contact" className="btn btn-line shrink-0">
            Enquire About Our Services
          </Link>
        </div>
        <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.number} delay={Math.min(index * 0.04, 0.2)} className="h-full">
                <article className="group flex h-full flex-col border border-line bg-white p-7 transition-colors duration-200 hover:border-gold">
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-display text-2xl font-semibold text-gold">
                      {service.number}
                    </span>
                    <Icon className="size-6 text-gold-ink" strokeWidth={1.25} aria-hidden="true" />
                  </div>
                  <h3 className="mt-8 text-xl font-semibold leading-snug text-navy">
                    {service.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{service.summary}</p>
                  <span
                    className="mt-6 h-px w-10 bg-gold transition-all duration-300 group-hover:w-16"
                    aria-hidden="true"
                  />
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
