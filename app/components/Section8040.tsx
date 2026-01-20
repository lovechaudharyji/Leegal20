import type { ReactNode } from "react";
import { Section8208 } from "./Section8208";
import { Section8211 } from "./Section8211";
import { Section8219 } from "./Section8219";
import { Section8352 } from "./Section8352";
import { Section9145 } from "./Section9145";

type FeatureCard = { title: string; description: string };
type ExploreFeatureBlock = {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
};

const FEATURE_CARDS: readonly FeatureCard[] = [
  {
    title: "Professional US LLC Registration",
    description:
      "End-to-end company formation with the correct legal structure, handled by experienced US compliance experts",
  },
  {
    title: "State Filing Fees Included",
    description:
      "No hidden government charges — all required state filing fees are fully covered upfront",
  },
  {
    title: "US Attorney Review & Support",
    description:
      "All formation documents are reviewed by a US attorney to ensure accuracy, compliance, and long-term protection",
  },
  {
    title: "EIN (Employer Identification Number)",
    description:
      "Federal tax ID obtained for you, enabling banking, payments, and official US business operations",
  },
  {
    title: "BOI Compliance Filing",
    description:
      "Mandatory Beneficial Ownership Information filing completed professionally on your behalf",
  },
  {
    title: "Registered Agent Included",
    description:
      "One year of registered agent service for handling official legal and state communications",
  },
  {
    title: "Unique US Business Address",
    description:
      "A dedicated American business address for registrations, platforms, and verification requirements",
  },
  {
    title: "Amazon Seller Address Support",
    description:
      "Optimized address support designed to meet Amazon and marketplace approval requirements",
  },
  {
    title: "Mail Scanning & Email Forwarding",
    description:
      "All physical mail is securely scanned and delivered directly to your inbox in real time",
  },
] as const;


const EXPLORE_FEATURE_BLOCKS: readonly ExploreFeatureBlock[] = [
  {
    title: "US LLC Registration & Compliance",
    description:
      "Complete US LLC formation including state filing fees, EIN, BOI filing, registered agent for one year, and US attorney support to ensure full compliance and peace of mind.",
    buttonText: "Learn More",
    buttonHref: "#",
  },
  {
    title: "USA Business Address & Mail Handling",
    description:
      "Operate with a verified US presence using a unique business address suitable for Amazon and platform verification, plus physical mail scanning and email delivery.",
    buttonText: "Learn More",
    buttonHref: "#",
  },
  {
    title: "US & Global Business Banking",
    description:
      "Expert assistance with Mercury US Business Banking and Wise Business Multi-Currency Accounts to manage USD and international transactions efficiently with low FX costs.",
    buttonText: "Learn More",
    buttonHref: "#",
  },
  {
    title: "Marketplace & Cross-Border Payments",
    description:
      "Professional setup support for Payoneer Marketplace Payments and Airwallex Cross-Border Accounts, enabling smooth marketplace payouts and global transfers.",
    buttonText: "Learn More",
    buttonHref: "#",
  },
  {
    title: "Stripe Payment Gateway Setup",
    description:
      "End-to-end Stripe setup guidance for US LLCs, including verification support and best practices to reduce payment holds, rejections, and account risks.",
    buttonText: "Learn More",
    buttonHref: "#",
  },
  {
    title: "Community Access, Branding & Growth Tools",
    description:
      "Includes Suprans’ private supplier access, US supplier directory, product hunt and marketplace sheets, dropshipping content by Mr. Suprans, a custom logo, and 10+ paid tools for 3 months (worth $1,500).",
    buttonText: "Learn More",
    buttonHref: "#",
  },
] as const;


function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div
      className={[
        "min-h-[140px] w-[400px] shrink-0 rounded-[20px] border border-gray-100 bg-white",
        "p-6 text-left shadow-[0px_2px_4px_rgba(0,0,0,0.02),0px_4px_8px_rgba(0,0,0,0.04)] hover:shadow-lg transition-shadow duration-300",
      ].join(" ")}
    >
      <div className="flex h-full flex-col justify-between">
        <div
          className="text-[20px] font-bold leading-[130%] text-[#141B34]"
          style={{
            fontFamily:
              '"Inter Display", Inter, var(--font-sans), ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial',
          }}
        >
          {title}
        </div>
        <div
          className="mt-3 line-clamp-3 text-[15px] font-medium leading-[150%] text-[#555555]"
          style={{
            fontFamily:
              '"Inter Display", Inter, var(--font-sans), ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial',
          }}
        >
          {description}{" "}
          <span className="inline-block align-text-bottom text-[#3960F9]">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="relative top-[2px] ml-1 inline-block size-4 align-text-bottom"
            >
              <path
                d="M4.66669 11.3333L11.3334 4.66663M11.3334 4.66663H4.66669M11.3334 4.66663V11.3333"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}

type Section8040Props = {
  children?: ReactNode;
  className?: string;
};

/**
 * Figma node: 10-8040
 * Layout: inline-flex column, justify-end, align-center, gap 48
 * Padding: 100px 0 79.777px 0
 * Background: rgba(251, 251, 251, 0.80)
 */
export function Section8040({ children, className }: Section8040Props) {
  return (
    <section className={["w-full", className ?? ""].join(" ")}>
      <div className="bg-[rgba(251,251,251,0.80)]">
        <div className="mx-auto inline-flex w-full flex-col items-center justify-end gap-[48px] px-0 pb-[79.777px] pt-[100px]">
          {children ?? <Section8040Placeholder />}
        </div>
      </div>
    </section>
  );
}

function Section8040Placeholder() {
  // Small offset so the third row doesn't look identical
  const cardsShifted = [...FEATURE_CARDS.slice(2), ...FEATURE_CARDS.slice(0, 2)];

  return (
    <div className="w-full">
      <div className="flex flex-col items-center gap-4">
        <h2
          className="text-center text-[36px] font-semibold leading-[140%] text-[#000000]"
          style={{
            fontFamily:
              '"Inter Display", Inter, var(--font-sans), ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial',
          }}
        >
          Powerful <span className="text-[#3960F9]">Features</span> Designed for
          You
        </h2>

        <p
          className="mx-auto w-full max-w-[422.43px] text-center text-[18px] font-medium leading-normal text-[#555555]"
          style={{
            fontFamily:
              '"Inter Display", Inter, var(--font-sans), ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial',
          }}
        >
          Our LLC Elite Plan removes complexity and replaces it with clarity,
          structure, and growth.
        </p>
      </div>

      <div className="mx-auto mt-6 w-full max-w-[1600px] px-6">
        {/* Marquee: all cards (right -> left, infinite loop) */}
        <div
          className="marquee flex w-full overflow-hidden gap-6 mx-auto"
          style={{
            // tweak these numbers to adjust spacing/speed
            ["--marquee-gap" as any]: "24px",
            ["--marquee-duration" as any]: "42s",
          }}
        >
          <div className="marquee__track flex min-w-full shrink-0 items-center gap-6 py-2">
            {[...FEATURE_CARDS, ...FEATURE_CARDS].map((c, idx) => (
              <FeatureCard
                key={`${c.title}-${idx}`}
                title={c.title}
                description={c.description}
              />
            ))}
          </div>
        </div>

        {/* Second line: left -> right */}
        <div
          className="marquee marquee--reverse flex w-full overflow-hidden gap-6 mx-auto mt-6"
          style={{
            ["--marquee-gap" as any]: "24px",
            ["--marquee-duration" as any]: "46s",
          }}
        >
          <div className="marquee__track flex min-w-full shrink-0 items-center gap-6 py-2">
            {[...FEATURE_CARDS, ...FEATURE_CARDS].map((c, idx) => (
              <FeatureCard
                key={`${c.title}-reverse-${idx}`}
                title={c.title}
                description={c.description}
              />
            ))}
          </div>
        </div>

        {/* Third line: right -> left */}
        <div
          className="marquee flex w-full overflow-hidden gap-6 mx-auto mt-6"
          style={{
            ["--marquee-gap" as any]: "24px",
            ["--marquee-duration" as any]: "44s",
          }}
        >
          <div className="marquee__track flex min-w-full shrink-0 items-center gap-6 py-2">
            {[...cardsShifted, ...cardsShifted].map((c, idx) => (
              <FeatureCard
                key={`${c.title}-third-${idx}`}
                title={c.title}
                description={c.description}
              />
            ))}
          </div>
        </div>
      </div>

      {/* New section below the cards (Figma: 10-8208) */}
      <div className="mt-16">
        <Section8208 />
      </div>

      {/* Next heading section (Figma: 10-8211) */}
      <div className="mt-16">
        <Section8211 />
      </div>

      {/* Voice / typing feature block (Figma: 10-9145/46/47 & 10-9155) */}
      <div className="mt-16 pb-8">
        {EXPLORE_FEATURE_BLOCKS.map((block, idx) => (
          <div key={idx} className={idx === 0 ? "" : "mt-16"}>
            <Section9145
              reverse={idx % 2 === 1}
              title={block.title}
              description={block.description}
              buttonText={block.buttonText}
              buttonHref={block.buttonHref}
            />
          </div>
        ))}
      </div>

      {/* Pricing heading (Figma: 10-8219) */}
      <div className="mt-16">
        <Section8219 />
      </div>

      {/* Export card (Figma: 10-8352) */}
      <div className="mt-16">
        <Section8352 />
      </div>
    </div>
  );
}


