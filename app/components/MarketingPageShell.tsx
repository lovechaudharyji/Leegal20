import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

const TOP_CLOUDS = [
  {
    key: "cloud-a",
    className:
      "left-[1236px] top-[757px] h-[147.866px] w-[256.338px] bg-[url('/cloud-020-a.png')] opacity-[0.4] blur-[0.6px]",
  },
  {
    key: "cloud-b",
    className:
      "left-[-139px] top-[963px] h-[147.866px] w-[467.069px] bg-[url('/cloud-020-b.png')] opacity-[0.3] blur-[0.8px]",
  },
  {
    key: "cloud-c",
    className:
      "left-[-119px] top-[552px] h-[147.866px] w-[467.069px] bg-[url('/cloud-020-c.png')] opacity-[0.5] blur-[0.7px]",
  },
] as const;

type MarketingPageShellProps = {
  activeNav?: string;
  hero: ReactNode;
  children?: ReactNode;
};

export function MarketingPageShell({
  activeNav = "Explore",
  hero,
  children,
}: MarketingPageShellProps) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-white text-zinc-950">
      {/* Top background (shared across marketing pages) */}
      <div className="relative overflow-hidden bg-[#F5F5F5] bg-[linear-gradient(180deg,rgba(244,244,245,0.35)_42.69%,rgba(57,96,249,0.35)_100%)]">
        {/* Clouds */}
        {TOP_CLOUDS.map((c) => (
          <div
            key={c.key}
            aria-hidden="true"
            className={[
              "pointer-events-none absolute z-0",
              "bg-cover bg-center mix-blend-screen",
              c.className,
            ].join(" ")}
          />
        ))}

        <Header activeNav={activeNav} />
        <main className="relative z-10">{hero}</main>
      </div>

      {children ? <main className="relative z-10">{children}</main> : null}

      <Footer />
    </div>
  );
}



