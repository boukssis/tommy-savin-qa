import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  titleId,
  tone = "light",
  children,
}: {
  eyebrow: string;
  title: string;
  titleId: string;
  tone?: "light" | "dark";
  children?: ReactNode;
}) {
  const dark = tone === "dark";

  return (
    <div className="max-w-3xl">
      <p
        className={`flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.28em] ${
          dark ? "text-gold" : "text-gold-ink"
        }`}
      >
        <span className={`h-px w-8 ${dark ? "bg-gold" : "bg-gold-ink"}`} aria-hidden="true" />
        {eyebrow}
      </p>
      <h2
        id={titleId}
        className={`mt-4 text-4xl font-semibold leading-[1.08] text-balance md:text-5xl ${
          dark ? "text-white" : "text-navy"
        }`}
      >
        {title}
      </h2>
      {children ? (
        <div
          className={`mt-5 max-w-2xl text-base leading-relaxed md:text-lg ${
            dark ? "text-white/75" : "text-muted"
          }`}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}
