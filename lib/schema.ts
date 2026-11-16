import { services } from "@/lib/content";
import { getSiteUrl, linkedInUrl, pageDescription, siteName } from "@/lib/site";

export function buildJsonLd() {
  const url = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteName,
    description: pageDescription,
    url,
    image: `${url}/brand/logo.png`,
    areaServed: {
      "@type": "Country",
      name: "United Kingdom",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "London",
      addressCountry: "GB",
    },
    founder: {
      "@type": "Person",
      name: "Tommy Savin",
      jobTitle: "Construction Advisor and Quality Assurance Consultant",
      sameAs: [linkedInUrl],
    },
    knowsAbout: [
      "Construction quality assurance",
      "Clerk of Works",
      "Construction site inspections",
      "Inspection and test plans",
      "NEC contract supervision",
      "Construction defects",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Construction quality assurance services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.summary,
        },
      })),
    },
  };
}
