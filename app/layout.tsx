import type { Metadata, Viewport } from "next";
import { DM_Sans, Manrope } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { buildJsonLd } from "@/lib/schema";
import { getSiteUrl, linkedInUrl, pageDescription, pageTitle, siteName } from "@/lib/site";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#06233D",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: pageTitle,
  description: pageDescription,
  applicationName: siteName,
  authors: [{ name: "Tommy Savin", url: linkedInUrl }],
  keywords: [
    "Construction Quality Assurance Consultant UK",
    "Independent QA Consultant London",
    "Clerk of Works Services UK",
    "Construction Site Audits",
    "Construction Quality Inspections",
    "NEC Supervisor Services",
    "Construction Defect Inspections",
    "Construction Quality Control Consultancy",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    locale: "en_GB",
    type: "website",
    siteName,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = JSON.stringify(buildJsonLd()).replace(/</g, "\\u003c");

  return (
    <html lang="en-GB" className={`${manrope.variable} ${dmSans.variable} h-full antialiased`}>
      <body className="min-h-full bg-white text-ink">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      </body>
    </html>
  );
}
