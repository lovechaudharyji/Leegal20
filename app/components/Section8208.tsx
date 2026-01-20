import type { ReactNode } from "react";

type Section8208Props = {
  className?: string;
  children?: ReactNode;
};

const BENEFIT_CARDS = [
  {
    iconSrc: "/clock-01.svg",
    title: "Save Time & Avoid Mistakes",
    description:
      "No trial-and-error, no rejected applications — everything is done the right way from day one.",
  },
  {
    iconSrc: "/content-writing.svg",
    title: "Operate with Confidence",
    description:
      "Your business is legally compliant, bank-approved, and platform-ready.",
  },
  {
    iconSrc: "/question.svg",
    title: "Build Global Trust",
    description:
      "US-registered companies are trusted more by customers, suppliers, and marketplaces.",
  },
  {
    iconSrc: "/security-check.svg",
    title: "Scale Without Limits",
    description:
      "Perfect foundation for dropshipping, Amazon FBA, private label, wholesale, and brand building.",
  },
  {
    iconSrc: "/waterfall-up-01.svg",
    title: "Make Data-Driven Decisions",
    description:
      "Access instant insights and accurate answers to guide smarter, faster decisions",
  },
  {
    iconSrc: "/cloud-angled-rain.svg",
    title: "Cloud Sync & Accessibility",
    description:
      "Work seamlessly across devices with reliable cloud syncing and 24/7 accessibility",
  },
] as const;

function BenefitCard({
  title,
  description,
  iconSrc,
}: {
  title: string;
  description: string;
  iconSrc?: string;
}) {
  return (
    <div
      className={[
        "inline-flex h-[227px] w-full flex-col items-start justify-center gap-[18px]",
        "rounded-[16px] border-2 bg-[#FBFBFB]",
        "px-6 py-6 sm:pl-6 sm:pr-[97.484px]",
        "transition-colors duration-200",
        "border-[#FFFFFF] hover:border-[#3960F9] focus-within:border-[#3960F9]",
      ].join(" ")}
    >
      <div className="inline-flex items-center justify-center rounded-[12px] bg-[#E6ECFF] p-3">
        {iconSrc ? <img src={iconSrc} alt="" className="size-6" /> : null}
      </div>

      <div className="flex flex-col items-start gap-2">
        <div
          className="text-[20px] font-bold leading-[140%] text-[#000000]"
          style={{
            fontFamily:
              '"Inter Display", Inter, var(--font-sans), ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial',
          }}
        >
          {title}
        </div>

        <div
          className="text-[16px] font-medium leading-[150%] text-[#555555]"
          style={{
            fontFamily:
              '"Inter Display", Inter, var(--font-sans), ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial',
          }}
        >
          {description}
        </div>
      </div>
    </div>
  );
}

/**
 * Figma node: 10-8208
 * Heading: "Benefits That Empower You"
 */
export function Section8208({ className, children }: Section8208Props) {
  return (
    <section className={["w-full bg-[#F5F5F5] py-16", className ?? ""].join(" ")}>
      <div className="mx-auto w-full max-w-[1600px] px-6">
        <h2
          className="text-center text-[36px] font-semibold leading-[140%] text-[#000000]"
          style={{
            fontFamily:
              '"Inter Display", Inter, var(--font-sans), ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial',
          }}
        >
          Benefits That <span className="text-[#3960F9]">Empower</span> You
        </h2>

        <p
          className="mx-auto mt-4 w-full max-w-[596.875px] text-center text-[18px] font-medium text-[#555555]"
          style={{
            fontFamily:
              '"Inter Display", Inter, var(--font-sans), ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial',
            lineHeight: "normal",
          }}
        >
          Why Founders Choose the LLC your productivity, protect your data
          <br />
          simplify your experience — all in one
          place
        </p>

        <div className="mx-auto mt-10 grid w-full max-w-[1200px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:max-w-[1300px]">
          {BENEFIT_CARDS.map((c) => (
            <BenefitCard
              key={c.title}
              iconSrc={c.iconSrc}
              title={c.title}
              description={c.description}
            />
          ))}
        </div>

        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </section>
  );
}


