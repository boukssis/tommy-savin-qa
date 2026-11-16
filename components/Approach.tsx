"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { steps } from "@/lib/content";

export function Approach() {
  const reduce = useReducedMotion();
  const animate = reduce === false;

  return (
    <section id="approach" className="bg-white py-20 md:py-28" aria-labelledby="approach-title">
      <div className="shell">
        <SectionHeading
          eyebrow="Our approach"
          title="A Clear, Practical Approach to Construction Quality"
          titleId="approach-title"
        >
          <p>A straightforward sequence, adapted to the scale and the stage of the project.</p>
        </SectionHeading>
        <ol className="relative mt-14 grid gap-12 md:grid-cols-4 md:gap-8">
          <div
            className="absolute top-5 right-[8%] left-[8%] hidden h-px bg-gold/45 md:block"
            aria-hidden="true"
          />
          {steps.map((step, index) => (
            <motion.li
              key={step.number}
              initial={animate ? { opacity: 0, y: 16 } : false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12% 0px" }}
              transition={{
                duration: animate ? 0.6 : 0,
                delay: animate ? index * 0.12 : 0,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="relative z-10 flex size-10 items-center justify-center bg-navy text-sm font-semibold text-gold">
                {step.number}
              </div>
              <h3 className="mt-6 text-2xl font-semibold text-navy">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{step.summary}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
