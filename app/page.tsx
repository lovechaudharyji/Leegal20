import { Hero } from "./components/Hero";
import { MarketingPageShell } from "./components/MarketingPageShell";
import { Section8040 } from "./components/Section8040";

export default function Home() {
  return (
    <MarketingPageShell
      activeNav="Explore"
      hero={
        <div className="min-h-[1134px]">
          <Hero />
        </div>
      }
    >
      <Section8040 />
    </MarketingPageShell>
  );
}


