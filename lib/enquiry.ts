import { services } from "@/lib/content";

export const enquiryServices = services.map((service) => service.title);

export type Enquiry = {
  name: string;
  company: string;
  email: string;
  service: string;
  details: string;
};

export type FieldErrors = Partial<Record<keyof Enquiry, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown) {
  if (typeof value !== "string") return "";
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim();
}

export function validateEnquiry(input: unknown):
  | { ok: true; data: Enquiry }
  | { ok: false; message: string; fieldErrors: FieldErrors } {
  const source = input && typeof input === "object" ? (input as Record<string, unknown>) : {};
  const name = clean(source.name);
  const company = clean(source.company);
  const email = clean(source.email);
  const service = clean(source.service);
  const details = clean(source.details);
  const fieldErrors: FieldErrors = {};

  if (name.length < 2 || name.length > 80) {
    fieldErrors.name = "Enter your full name.";
  }
  if (company.length > 120) {
    fieldErrors.company = "Company name is too long.";
  }
  if (!emailPattern.test(email) || email.length > 254) {
    fieldErrors.email = "Enter a valid email address.";
  }
  if (!enquiryServices.includes(service)) {
    fieldErrors.service = "Select a service.";
  }
  if (details.length < 20 || details.length > 4000) {
    fieldErrors.details = "Describe the project in at least a few sentences.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false,
      message: "Check the highlighted fields and try again.",
      fieldErrors,
    };
  }

  return { ok: true, data: { name, company, email, service, details } };
}
