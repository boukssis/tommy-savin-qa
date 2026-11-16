import Image from "next/image";
import Link from "next/link";

const markers = ["London Based", "UK-Wide Consultancy", "Major Project Experience"];

export function Hero() {
  return (
    <section id="home" className="relative min-h-[100svh] overflow-hidden bg-navy-deep text-white">
      <Image
        src="/images/hero.jpg"
        alt="Tower cranes rising over the steel frame of a high-rise building under construction"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_30%]"
      />
      <div className="hero-shade absolute inset-0" />
      <div className="hero-grid absolute inset-0" aria-hidden="true" />
      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1280px] flex-col justify-end px-5 pb-10 pt-32 md:px-8 md:pb-14">
        <div className="hero-settle max-w-3xl">
          <p className="flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-gold">
            <span className="h-10 w-px bg-gold" aria-hidden="true" />
            Independent construction quality assurance
          </p>
          <h1 className="mt-5 text-[2.7rem] font-semibold leading-[0.96] text-white sm:text-6xl lg:text-[5.15rem]">
            Quality Built In.
            <span className="mt-1 block">Confidence Delivered.</span>
          </h1>
          <div className="mt-6 h-px w-16 bg-gold" aria-hidden="true" />
          <p className="mt-6 max-w-xl text-lg font-medium leading-snug text-white md:text-xl">
            <span className="block">Independent Construction Quality Assurance</span>
            <span className="block">&amp; Expert Project Advisory</span>
          </p>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/78 md:text-lg">
            Expert construction quality assurance, compliance guidance and independent site
            inspections for complex projects across the UK. Helping developers, contractors and
            project teams achieve higher standards, reduce defects and deliver with confidence.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/#contact" className="btn btn-gold">
              Discuss Your Project
            </Link>
            <Link href="/#services" className="btn btn-ghost">
              Explore Our Services
            </Link>
          </div>
        </div>
        <ul className="mt-12 grid gap-4 border-t border-white/15 pt-6 sm:grid-cols-3">
          {markers.map((item) => (
            <li key={item} className="flex items-center gap-3 text-sm font-medium text-white/85">
              <span className="size-1.5 bg-gold" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
