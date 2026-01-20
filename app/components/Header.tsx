import type { ReactNode } from "react";
import Link from "next/link";

type HeaderProps = {
  logo?: ReactNode;
  brandName?: string;
  navLinks?: readonly { label: string; href: string }[];
  activeNav?: string;
};

export function Header({
  logo,
  brandName = "Leegal Nation",
  navLinks = [
    { label: "Explore", href: "/" },
    { label: "Team", href: "/team" },
    { label: "Enterprise", href: "/enterprise" },
    { label: "Pricing", href: "/pricing" },
    { label: "Download", href: "/download" },
  ],
  activeNav = "Explore",
}: HeaderProps) {
  return (
    <header className="relative z-10">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-[#2F6BFF]">
            {logo ?? <LogoMark />}
          </div>
          <span className="text-xl font-semibold text-zinc-900">
            {brandName}
          </span>
        </div>

        <nav className="hidden h-[19px] w-[395px] items-center justify-center gap-8 text-[17px] leading-[19px] text-[#555555] md:flex">
          {navLinks.map((item) => {
            const isActive = item.label === activeNav;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={[
                  "relative font-medium transition-colors",
                  isActive
                    ? "text-[#000000]"
                    : "text-[#555555] hover:text-[#000000]",
                ].join(" ")}
              >
                {item.label}
                {isActive ? (
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-2 left-1/2 h-[2px] w-6 -translate-x-1/2 rounded-full bg-[#000000]"
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-[10px] rounded-[8px] border-[0.8px] border-[#EBEBEB] bg-[#FFFFFFCC] px-[16px] py-[14px] text-sm font-semibold text-[#000000] shadow-sm transition hover:bg-white/90"
          >
            Log In
          </Link>
          <Link
            href="/signup"
            className="inline-flex items-center justify-center gap-[10px] rounded-[8px] px-[16px] py-[14px] text-sm font-semibold text-white shadow-sm transition"
            style={{
              background:
                "radial-gradient(27.92% 100% at 50% 0%, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.00) 100%), #3960F9",
              boxShadow:
                "0 -1px 0 0 rgba(0, 0, 0, 0.16) inset, 0 1px 0 0 rgba(255, 255, 255, 0.16) inset",
            }}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
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


