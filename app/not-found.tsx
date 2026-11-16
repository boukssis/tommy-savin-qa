import Link from "next/link";

export default function NotFound() {
  return (
    <section className="bg-offwhite px-5 py-32">
      <div className="shell">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-gold-ink">404</p>
        <h1 className="mt-4 max-w-xl text-4xl font-semibold text-navy md:text-5xl">
          This page is not available.
        </h1>
        <p className="mt-4 max-w-xl text-muted">
          The address may be out of date. Everything about the consultancy is on the home page.
        </p>
        <Link href="/" className="btn btn-gold mt-8">
          Return home
        </Link>
      </div>
    </section>
  );
}
