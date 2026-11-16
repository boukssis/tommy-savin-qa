import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { technologies } from "@/lib/content";

export function Technology() {
  return (
    <section className="bg-offwhite py-20 md:py-28" aria-labelledby="technology-title">
      <div className="shell">
        <SectionHeading
          eyebrow="Digital delivery"
          title="Experienced in Modern Construction Technology"
          titleId="technology-title"
        >
          <p>
            Combining practical construction expertise with hands-on experience of leading digital
            project management, design coordination and quality reporting platforms.
          </p>
        </SectionHeading>
        <Reveal>
          <ul className="mt-12 grid border border-line sm:grid-cols-2 lg:grid-cols-4">
            {technologies.map((name) => (
              <li
                key={name}
                className="border border-line bg-white px-6 py-8 text-lg font-semibold text-navy"
              >
                {name}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted">
            Named as platforms Tommy has worked with. This is not a partnership, accreditation or
            vendor endorsement.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
