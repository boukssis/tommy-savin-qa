"use client";

import { Plus } from "lucide-react";
import { useId, useState } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { faqs } from "@/lib/content";

export function Faq() {
  const baseId = useId();
  const [open, setOpen] = useState<Record<number, boolean>>({ 0: true });

  return (
    <section className="bg-offwhite py-20 md:py-28" aria-labelledby="faq-title">
      <div className="shell grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading
            eyebrow="Questions"
            title="Plain answers, before you enquire."
            titleId="faq-title"
          />
        </div>
        <div className="border-t border-line lg:col-span-8">
          {faqs.map((faq, index) => {
            const expanded = Boolean(open[index]);
            const panelId = `${baseId}-panel-${index}`;
            const buttonId = `${baseId}-button-${index}`;
            return (
              <div key={faq.question} className="border-b border-line">
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    className="flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left"
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    onClick={() =>
                      setOpen((current) => ({ ...current, [index]: !current[index] }))
                    }
                  >
                    <span className="text-lg font-semibold text-navy">{faq.question}</span>
                    <Plus
                      className={`size-5 shrink-0 text-gold-ink transition-transform duration-200 ${
                        expanded ? "rotate-45" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!expanded}>
                  <p className="max-w-3xl pb-6 text-base leading-relaxed text-muted">{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
