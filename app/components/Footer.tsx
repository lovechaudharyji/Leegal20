import type { ReactNode } from "react";

type FooterLink = {
  label: string;
  href: string;
};

type FooterColumn = {
  title: string;
  links: readonly FooterLink[];
};

const COLUMNS: readonly FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Explore", href: "/" },
      { label: "Pricing", href: "/pricing" },
      { label: "Enterprise", href: "/enterprise" },
      { label: "Download", href: "/download" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/team" },
      { label: "Team", href: "/team" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Help Center", href: "#" },
      { label: "Guides", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Status", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" },
      { label: "Security", href: "#" },
    ],
  },
] as const;

type SocialLink = {
  label: string;
  href: string;
  icon: ReactNode;
};

const SOCIALS: readonly SocialLink[] = [
  { label: "X (Twitter)", href: "#", icon: <XIcon /> },
  { label: "LinkedIn", href: "#", icon: <LinkedInIcon /> },
  { label: "Instagram", href: "#", icon: <InstagramIcon /> },
  { label: "YouTube", href: "#", icon: <YouTubeIcon /> },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative w-full">
      {/* Gradient matches the hero banner */}
      <div className="border-t border-[#E6E6E6] bg-[#F5F5F5] bg-[linear-gradient(180deg,rgba(244,244,245,0.35)_42.69%,rgba(57,96,249,0.35)_100%)]">
        <div
          className="mx-auto w-full max-w-6xl px-6 pb-10 pt-14"
          style={{
            fontFamily:
              '"Inter Display", Inter, var(--font-sans), ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial',
          }}
        >
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Brand / description */}
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-[#2F6BFF]">
                  <LogoMark />
                </div>
                <div className="text-xl font-semibold text-zinc-900">
                  Leegal Nation
                </div>
              </div>

              <p className="mt-4 max-w-sm text-[15px] font-medium leading-[22px] text-[#555555]">
                Launch your US business and scale globally with confidence — formation,
                compliance, and operational setup in one place.
              </p>

              <div className="mt-5 flex items-center gap-3">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    target="_blank"
                    rel="noreferrer"
                    className={[
                      "inline-flex size-10 items-center justify-center rounded-xl",
                      "border border-black/10 bg-white/60 text-[#555555] shadow-sm",
                      "transition hover:border-[#3960F9]/40 hover:bg-white hover:text-[#000000]",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3960F9]/30",
                    ].join(" ")}
                  >
                    <span className="sr-only">{s.label}</span>
                    <span aria-hidden="true" className="text-current">
                      {s.icon}
                    </span>
                  </a>
                ))}
              </div>

              <div id="contact" className="mt-6 text-sm text-[#555555]">
                <div className="font-semibold text-[#000000]">Contact</div>
                <a
                  className="mt-1 inline-flex items-center gap-2 font-medium hover:text-[#000000]"
                  href="mailto:support@leegalnation.com"
                >
                  support@leegalnation.com
                </a>
              </div>
            </div>

            {/* Columns */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
                {COLUMNS.map((col) => (
                  <div key={col.title}>
                    <div className="text-[13px] font-semibold tracking-[0.02em] text-[#000000]">
                      {col.title}
                    </div>
                    <ul className="mt-3 space-y-2">
                      {col.links.map((l) => (
                        <li key={l.label}>
                          <a
                            href={l.href}
                            className="text-[14px] font-medium text-[#555555] transition hover:text-[#000000]"
                          >
                            {l.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-10 border-t border-[#E6E6E6] pt-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-[13px] font-medium text-[#555555]">
                © {year} Leegal Nation. All rights reserved.
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] font-medium text-[#555555]">
                <a className="hover:text-[#000000]" href="#">
                  Privacy
                </a>
                <span aria-hidden="true" className="text-black/20">
                  •
                </span>
                <a className="hover:text-[#000000]" href="#">
                  Terms
                </a>
                <span aria-hidden="true" className="text-black/20">
                  •
                </span>
                <a className="hover:text-[#000000]" href="#">
                  Cookies
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function LogoMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-5">
      <path
        d="M12 5.5c4 0 7 3.2 7 7.15 0 3.95-3 6.85-7 6.85s-7-2.9-7-6.85C5 8.7 8 5.5 12 5.5Z"
        fill="white"
        opacity="0.95"
      />
      <path
        d="M9 13.2c.7 1.2 2 2 3.5 2s2.8-.8 3.5-2"
        stroke="#2F6BFF"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="9.5" cy="10.6" r="1" fill="#2F6BFF" />
      <circle cx="14.5" cy="10.6" r="1" fill="#2F6BFF" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="size-5">
      <path d="M18.9 2H22l-6.8 7.8L23 22h-6.8l-5.3-6.7L4.9 22H2l7.4-8.5L1 2h7l4.8 6.1L18.9 2Zm-1.2 18h1.7L6.2 3.9H4.4l13.3 16.1Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="size-5">
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM0.5 8.2H4.5V23H0.5V8.2ZM8.2 8.2H12v2h.1c.53-.99 1.84-2.04 3.79-2.04 4.05 0 4.8 2.67 4.8 6.14V23h-4v-7.66c0-1.83-.03-4.18-2.55-4.18-2.55 0-2.94 1.99-2.94 4.05V23h-4V8.2Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-5">
      <path
        d="M7.5 2.75h9A4.75 4.75 0 0 1 21.25 7.5v9A4.75 4.75 0 0 1 16.5 21.25h-9A4.75 4.75 0 0 1 2.75 16.5v-9A4.75 4.75 0 0 1 7.5 2.75Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M12 15.8a3.8 3.8 0 1 0 0-7.6 3.8 3.8 0 0 0 0 7.6Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M17.3 6.9h.01"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="size-5">
      <path d="M21.6 7.2a2.7 2.7 0 0 0-1.9-1.9C18.1 4.8 12 4.8 12 4.8s-6.1 0-7.7.5a2.7 2.7 0 0 0-1.9 1.9 28.3 28.3 0 0 0-.4 4.8c0 1.6.1 3.2.4 4.8a2.7 2.7 0 0 0 1.9 1.9c1.6.5 7.7.5 7.7.5s6.1 0 7.7-.5a2.7 2.7 0 0 0 1.9-1.9c.3-1.6.4-3.2.4-4.8 0-1.6-.1-3.2-.4-4.8ZM10.3 15V9l5.2 3-5.2 3Z" />
    </svg>
  );
}


