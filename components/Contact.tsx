import { ArrowUpRight } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { linkedInUrl } from "@/lib/site";

function formEnabled() {
  return Boolean(
    process.env.RESEND_API_KEY &&
      process.env.CONTACT_TO_EMAIL &&
      process.env.CONTACT_FROM_EMAIL,
  );
}

export function Contact() {
  const enabled = formEnabled();

  return (
    <section id="contact" className="bg-navy-deep py-20 text-white md:py-28" aria-labelledby="contact-title">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-6">
          <p className="flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-gold">
            <span className="h-px w-8 bg-gold" aria-hidden="true" />
            Contact
          </p>
          <h2 id="contact-title" className="mt-4 text-4xl font-semibold leading-[1.08] text-balance md:text-5xl">
            Let&apos;s Build Quality Into Your Next Project.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
            Whether you need independent site inspections, construction quality assurance, Clerk of
            Works services, or expert project advice, get in touch to discuss your requirements.
          </p>
          <dl className="mt-8 grid gap-6 sm:grid-cols-2">
            <div>
              <dt className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-gold">
                Location
              </dt>
              <dd className="mt-2 text-lg">London, United Kingdom</dd>
            </div>
            <div>
              <dt className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-gold">
                Coverage
              </dt>
              <dd className="mt-2 text-lg">Available UK-wide</dd>
            </div>
          </dl>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={linkedInUrl}
              className="btn btn-gold"
              target="_blank"
              rel="noopener noreferrer"
            >
              Connect on LinkedIn
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
            {enabled ? (
              <a href="#enquiry-form" className="btn btn-ghost">
                Discuss Your Project
              </a>
            ) : (
              <a
                href={linkedInUrl}
                className="btn btn-ghost"
                target="_blank"
                rel="noopener noreferrer"
              >
                Discuss Your Project
              </a>
            )}
          </div>
        </div>
        <div className="lg:col-span-6">
          {enabled ? (
            <ContactForm />
          ) : (
            <div className="border border-white/15 p-7 md:p-9">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-gold">
                Enquiries
              </p>
              <p className="mt-4 text-2xl font-semibold leading-snug">
                The direct route for a project conversation is LinkedIn.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-white/70">
                Share the scheme, the stage and the kind of support you are considering. Tommy will
                pick the conversation up from there.
              </p>
              <a
                href={linkedInUrl}
                className="btn btn-gold mt-8"
                target="_blank"
                rel="noopener noreferrer"
              >
                Connect on LinkedIn
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
