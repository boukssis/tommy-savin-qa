"use client";

import { useState, type FormEvent } from "react";
import type { FieldErrors } from "@/lib/enquiry";
import { enquiryServices } from "@/lib/enquiry";
import { linkedInUrl } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("submitting");
    setMessage("");
    setFieldErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const payload = (await response.json()) as {
        ok?: boolean;
        message?: string;
        fieldErrors?: FieldErrors;
      };
      if (!response.ok || !payload.ok) {
        setStatus("error");
        setMessage(payload.message || "The enquiry could not be sent.");
        setFieldErrors(payload.fieldErrors ?? {});
        return;
      }
      setStatus("success");
      setMessage("Thank you. Your enquiry has been sent.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("The enquiry could not be sent. Please try again, or connect on LinkedIn.");
    }
  }

  if (status === "success") {
    return (
      <div id="enquiry-form" className="border border-white/15 p-7" role="status">
        <p className="text-lg font-semibold text-white">{message}</p>
        <p className="mt-3 text-sm leading-relaxed text-white/70">
          If you need to add anything further, LinkedIn remains open.
        </p>
        <a
          href={linkedInUrl}
          className="btn btn-gold mt-6"
          target="_blank"
          rel="noopener noreferrer"
        >
          Connect on LinkedIn
        </a>
      </div>
    );
  }

  return (
    <form id="enquiry-form" className="relative grid gap-4" onSubmit={onSubmit} noValidate>
      <div className="hp" aria-hidden="true">
        <label htmlFor="company_website">Website</label>
        <input id="company_website" name="company_website" tabIndex={-1} autoComplete="off" />
      </div>
      <label className="field">
        <span>Full name</span>
        <input name="name" autoComplete="name" required maxLength={80} />
        {fieldErrors.name ? <small className="field-error">{fieldErrors.name}</small> : null}
      </label>
      <label className="field">
        <span>Company</span>
        <input name="company" autoComplete="organization" maxLength={120} />
        {fieldErrors.company ? <small className="field-error">{fieldErrors.company}</small> : null}
      </label>
      <label className="field">
        <span>Email address</span>
        <input name="email" type="email" autoComplete="email" required maxLength={254} />
        {fieldErrors.email ? <small className="field-error">{fieldErrors.email}</small> : null}
      </label>
      <label className="field">
        <span>Service required</span>
        <select name="service" required defaultValue="">
          <option value="" disabled>
            Select a service
          </option>
          {enquiryServices.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
        {fieldErrors.service ? <small className="field-error">{fieldErrors.service}</small> : null}
      </label>
      <label className="field">
        <span>Project details</span>
        <textarea name="details" required minLength={20} maxLength={4000} />
        {fieldErrors.details ? <small className="field-error">{fieldErrors.details}</small> : null}
      </label>
      {status === "error" ? (
        <p className="field-error" role="alert">
          {message}
        </p>
      ) : null}
      <button className="btn btn-gold mt-2" type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : "Discuss Your Project"}
      </button>
    </form>
  );
}
