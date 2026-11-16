export const linkedInUrl = "https://www.linkedin.com/in/tommy-savin-0aa592b0/";

export const nav = [
  { href: "/#home", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#services", label: "Services" },
  { href: "/#experience", label: "Experience" },
  { href: "/#approach", label: "Our Approach" },
  { href: "/#contact", label: "Contact" },
] as const;

export const siteName = "Tommy Savin QA";

export const pageTitle =
  "Tommy Savin QA | Independent Construction Quality Assurance Consultant UK";

export const pageDescription =
  "Independent construction quality assurance, Clerk of Works, site inspections and project advisory services from Tommy Savin. Based in London, supporting projects UK-wide.";

export function getSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");

  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (production) return `https://${production.replace(/^https?:\/\//, "")}`;

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) return `https://${vercel.replace(/^https?:\/\//, "")}`;

  return "http://localhost:3000";
}

export function getBakseezUrl() {
  const value = process.env.NEXT_PUBLIC_BAKSEEZ_URL?.trim();
  if (!value) return "";
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" && url.protocol !== "http:") return "";
    return url.toString();
  } catch {
    return "";
  }
}
