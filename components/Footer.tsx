import Link from "next/link";
import { Logo } from "@/components/Logo";
import { getBakseezUrl, linkedInUrl, nav } from "@/lib/site";

async function copyrightYear() {
  "use cache";
  return new Date().getFullYear();
}

export async function Footer() {
  const year = await copyrightYear();
  const bakseezUrl = getBakseezUrl();

  return (
    <footer className="bg-navy-deep text-white">
      <div className="shell grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo variant="stacked" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/70">
            Independent construction quality assurance, site inspection and project advisory for
            complex schemes across the United Kingdom.
          </p>
        </div>
        <div className="md:col-span-3">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-gold">
            Navigate
          </p>
          <ul className="mt-4 space-y-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-white/75 hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-4">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-gold">
            Consultancy
          </p>
          <p className="mt-4 text-sm text-white/75">London, United Kingdom</p>
          <p className="mt-1 text-sm text-white/75">Available UK-wide</p>
          <a
            href={linkedInUrl}
            className="mt-4 inline-flex text-sm font-semibold text-gold-soft hover:text-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            Connect on LinkedIn
          </a>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="shell flex flex-col gap-2 py-5 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Tommy Savin QA.</p>
          <p>Photography via Unsplash and Pexels. Images are illustrative.</p>
        </div>
        <div className="border-t border-white/10 py-4 text-center">
          <p className="text-sm text-white/70">
            Made by{" "}
            {bakseezUrl ? (
              <a
                href={bakseezUrl}
                className="text-gold-soft hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                Bakseez Labs
              </a>
            ) : (
              <span className="text-gold-soft">Bakseez Labs</span>
            )}
          </p>
        </div>
      </div>
    </footer>
  );
}
