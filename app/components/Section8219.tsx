import type { ReactNode } from "react";

type Section8219Props = {
  className?: string;
  children?: ReactNode;
};

const PRICING_CARDS = [
  {
    title: "Free",
    price: "$0",
    priceSuffix: "/month",
    description: "Explore how AI can help with\neveryday tasks",
    features: [
      "Access to LAI-4.1 mini",
      "Real-time data from the web with search",
      "Limited access to LAI-40, Leegal Nation 04-mini, and deep research",
      "Limited access to file uploads, data analysis, image generation, and voice mode",
      "Code edits with the Leegal Nation desktop app for macOS",
      "Use custom LAIs",
    ],
    ctaText: "Get Free",
    href: "/signup?plan=free",
    highlighted: false,
  },
  {
    title: "Plus",
    price: "$20",
    priceSuffix: "/month",
    description: "Level up productivity and creativity\nwith expanded access",
    features: [
      "Everything in Free",
      "Real-time data from the web with search",
      "Extended limits on messaging, file uploads, data analysis, and image generation",
      "Standard and advanced voice mode with video and screensharing",
      "Access to deep research and multiple reasoning models",
      "Opportunities to test new features",
      "Create and use projects, tasks, and custom GPTs",
      "Access to a research preview of LAI-4.5, our largest model yet, and LAI-4.1, a model optimized for coding tasks",
    ],
    ctaText: "Get Plus",
    href: "/signup?plan=premium",
    highlighted: true,
  },
  {
    title: "Pro",
    price: "$200",
    priceSuffix: "/month",
    description: "Get the best of OpenAI with the\nhighest level of access",
    features: [
      "Everything in Plus",
      "Extended access to deep research",
      "Unlimited access to all reasoning models and LAI-40",
      "Unlimited access to advanced voice, with higher limits for video and screensharing",
      "Access to deep research and multiple reasoning models",
      "Access to a research preview of Operator",
      "Access to a research preview of Codex agent",
      "Access to Leegal Nation o3-pro, which uses more compute for the best answers to the hardest questions",
    ],
    ctaText: "Get Pro",
    href: "/signup?plan=premium",
    highlighted: false,
  },
] as const;

function renderMultiline(text: string) {
  return text.split("\n").map((line, idx, arr) => (
    // eslint-disable-next-line react/no-array-index-key
    <span key={idx}>
      {line}
      {idx < arr.length - 1 ? <br /> : null}
    </span>
  ));
}

function DiagonalArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className={className ?? "size-5"}
    >
      <path
        d="M15.4609 6.17773L4.53892 13.8254"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.65865 5.15346C9.65865 5.15346 14.8319 5.27729 15.4617 6.17671C16.0915 7.07613 14.4384 11.9797 14.4384 11.9797"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PricingCard({
  title,
  price,
  priceSuffix = "/month",
  description,
  features,
  ctaText,
  href,
  highlighted,
}: (typeof PRICING_CARDS)[number]) {
  return (
    <div
      className={[
        "flex min-h-[721px] w-full max-w-[400px] flex-col",
        "rounded-[16px] border bg-white",
        "p-6",
        "transition-colors duration-200",
        highlighted ? "border-[#3960F9]" : "border-[#E6E6E6]",
        "hover:border-[#3960F9]",
      ].join(" ")}
    >
      <div className="w-full">
        <div
          className="text-[24px] font-bold leading-[140%] text-[#000000]"
          style={{
            fontFamily:
              '"Inter Display", Inter, var(--font-sans), ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial',
          }}
        >
          {title}
        </div>

        <div className="mt-2 flex items-baseline gap-2">
          <span
            className="text-[36px] font-semibold leading-[140%] text-[#3960F9]"
            style={{
              fontFamily:
                '"Inter Display", Inter, var(--font-sans), ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial',
            }}
          >
            {price}
          </span>
          <span className="text-[16px] font-medium text-[#000000]">
            {priceSuffix}
          </span>
        </div>

        {description ? (
          <div
            className="mt-3 text-[14px] font-medium leading-[20px] text-[#555555]"
            style={{
              fontFamily:
                '"Inter Display", Inter, var(--font-sans), ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial',
            }}
          >
            {renderMultiline(description)}
          </div>
        ) : null}

        <a
          href={href}
          className="mt-6 inline-flex h-[44px] w-full items-center justify-center gap-2 rounded-[8px] text-sm font-semibold text-white"
          style={{
            background:
              "radial-gradient(27.92% 100% at 50% 0%, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.00) 100%), #3960F9",
            boxShadow:
              "0 0.75px 1.5px -0.75px rgba(9, 6, 63, 0.40), 0 0.75px 0 0 rgba(255, 255, 255, 0.16) inset, 0 0 0 0.75px #3960F9",
          }}
        >
          {ctaText}
          <DiagonalArrowIcon className="size-5 text-white" />
        </a>

        <div className="mt-6 border-t border-[#E6E6E6]" />
      </div>

      <div className="mt-6 w-full space-y-4">
        {features.map((f) => (
          <div key={f} className="flex items-start gap-3">
            <img
              src="/tick-01.svg"
              alt=""
              aria-hidden="true"
              className="mt-[2px] size-5"
            />
            <div className="text-[12px] font-medium leading-[18px] text-[#555555]">
              {f}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Figma node: 10-8219
 * Heading: "Pricing"
 */
export function Section8219({ className, children }: Section8219Props) {
  return (
    <section className={["w-full", className ?? ""].join(" ")}>
      <div className="mx-auto w-full max-w-[1600px] px-6">
        <h2
          className="text-center text-[36px] font-semibold leading-[140%] text-[#000000]"
          style={{
            fontFamily:
              '"Inter Display", Inter, var(--font-sans), ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial',
          }}
        >
          Pricing
        </h2>

        <p
          className="mx-auto mt-4 w-full max-w-[596.875px] text-center text-[18px] font-medium text-[#555555]"
          style={{
            fontFamily:
              '"Inter Display", Inter, var(--font-sans), ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial',
            lineHeight: "normal",
          }}
        >
          See pricing for our individual, team,
          and enterprise plans.
        </p>

        <div className="mx-auto mt-10 grid w-full max-w-[1300px] grid-cols-1 justify-items-center gap-6 lg:grid-cols-3">
          {PRICING_CARDS.map((c) => (
            <PricingCard key={c.title} {...c} />
          ))}
        </div>

        {children ? <div className="mt-10">{children}</div> : null}
      </div>
    </section>
  );
}


