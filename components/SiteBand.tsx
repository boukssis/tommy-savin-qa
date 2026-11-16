import Image from "next/image";

export function SiteBand() {
  return (
    <section className="relative min-h-[440px] overflow-hidden bg-navy-deep" aria-label="On site">
      <Image
        src="/images/inspection.jpg"
        alt="A project team reviewing reinforcement on the open deck of a building under construction"
        fill
        sizes="100vw"
        className="object-cover object-[center_60%]"
      />
      <div className="absolute inset-0 bg-navy-deep/72" />
      <div className="relative flex min-h-[440px] items-end">
        <div className="shell py-16">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-gold">
            On site
          </p>
          <p className="mt-4 max-w-2xl text-3xl font-semibold leading-tight text-white md:text-5xl">
            Where workmanship is decided, and where independent eyes still matter.
          </p>
        </div>
      </div>
    </section>
  );
}
