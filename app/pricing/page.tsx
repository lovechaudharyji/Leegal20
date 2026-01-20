import { MarketingPageShell } from "../components/MarketingPageShell";

const PLANS = [
  {
    title: "Starter",
    price: "$299",
    suffix: "one-time",
    desc: "For founders who want a clean formation and a clear checklist.",
    features: [
      "US LLC formation guidance",
      "State filing prep support",
      "EIN request guidance",
      "Basic compliance checklist",
      "Email support",
    ],
    cta: "Start Starter",
    href: "/signup?plan=free",
    highlighted: false,
  },
  {
    title: "Growth",
    price: "$999",
    suffix: "one-time",
    desc: "Best for cross-border founders who want faster setup and fewer mistakes.",
    features: [
      "Everything in Starter",
      "BOI filing support",
      "Banking & payments setup guidance",
      "Marketplace verification guidance",
      "Priority email support",
    ],
    cta: "Choose Growth",
    href: "/signup?plan=premium",
    highlighted: true,
  },
  {
    title: "Elite",
    price: "Custom",
    suffix: "quote",
    desc: "For teams that need higher-touch onboarding and ongoing compliance workflows.",
    features: [
      "Everything in Growth",
      "Dedicated onboarding manager",
      "Multi-entity / multi-state planning",
      "Documentation workflows & templates",
      "Ongoing compliance support",
    ],
    cta: "Talk to Sales",
    href: "#",
    highlighted: false,
  },
] as const;

const FAQ = [
  {
    q: "Are government fees included?",
    a: "Government fees vary by state. We’ll confirm fees upfront before you submit any payments.",
  },
  {
    q: "How long does formation take?",
    a: "Timelines depend on the state and your documents. Most founders can complete setup in days, not weeks, when information is ready.",
  },
  {
    q: "Can you help with banking and payments?",
    a: "Yes — we provide step-by-step setup guidance for common banking and payment providers used by global founders.",
  },
] as const;

export default function PricingPage() {
  return (
    <MarketingPageShell
      activeNav="Pricing"
      hero={
        <section className="mx-auto w-full max-w-6xl px-6 pb-16 pt-6 sm:pt-10">
          <div className="mx-auto max-w-4xl text-center">
            <div
              className="mx-auto inline-flex h-[40px] items-center justify-center gap-[8px] rounded-[99px] border border-black/6 bg-white/40 px-[12px] py-[6px] shadow-sm"
              style={{
                background:
                  "radial-gradient(27.92% 100% at 50% 0%, rgba(57, 96, 249, 0.06) 0%, rgba(255, 255, 255, 0.00) 100%), rgba(255, 255, 255, 0.40)",
                borderColor: "rgba(0, 0, 0, 0.06)",
              }}
            >
              <span className="text-[18px] font-semibold text-[#555555]">
                Simple, transparent pricing
              </span>
            </div>

            <h1
              className="mx-auto mt-8 w-full max-w-[920px] text-center text-[40px] font-semibold leading-[1.05] sm:text-[58px] sm:leading-[1.25]"
              style={{
                fontFamily:
                  '"Inter Display", Inter, var(--font-sans), ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial',
                background:
                  "linear-gradient(90deg, #666666 0%, #000000 30%, #000000 70%, #666666 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                WebkitTextFillColor: "transparent",
              }}
            >
              Choose a plan that matches
              <br />
              your stage
            </h1>

            <p
              className="mx-auto mt-6 w-full max-w-[620px] text-center text-[18px] font-medium leading-[24px] text-[#555555]"
              style={{
                fontFamily:
                  '"Inter Display", Inter, var(--font-sans), ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial',
              }}
            >
              From first-time founders to enterprise teams — get a clean setup, predictable
              timelines, and compliance confidence.
            </p>
          </div>
        </section>
      }
    >
      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {PLANS.map((p) => (
            <div
              key={p.title}
              className={[
                "flex flex-col rounded-[16px] border bg-white p-6 shadow-sm",
                p.highlighted ? "border-[#3960F9]" : "border-[#E6E6E6]",
              ].join(" ")}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div
                    className="text-[22px] font-semibold text-[#000000]"
                    style={{
                      fontFamily:
                        '"Inter Display", Inter, var(--font-sans), ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial',
                    }}
                  >
                    {p.title}
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span
                      className="text-[36px] font-semibold leading-[140%] text-[#3960F9]"
                      style={{
                        fontFamily:
                          '"Inter Display", Inter, var(--font-sans), ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial',
                      }}
                    >
                      {p.price}
                    </span>
                    <span className="text-[14px] font-medium text-[#555555]">
                      {p.suffix}
                    </span>
                  </div>
                </div>
                {p.highlighted ? (
                  <span className="rounded-full bg-[#EEF3FF] px-3 py-1 text-xs font-semibold text-[#3960F9]">
                    Most popular
                  </span>
                ) : null}
              </div>

              <p className="mt-3 text-[15px] font-medium leading-[22px] text-[#555555]">
                {p.desc}
              </p>

              <a
                href={p.href}
                className="mt-6 inline-flex h-[44px] w-full items-center justify-center rounded-[8px] text-sm font-semibold text-white"
                style={{
                  background:
                    "radial-gradient(27.92% 100% at 50% 0%, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.00) 100%), #3960F9",
                  boxShadow:
                    "0 0.75px 1.5px -0.75px rgba(9, 6, 63, 0.40), 0 0.75px 0 0 rgba(255, 255, 255, 0.16) inset, 0 0 0 0.75px #3960F9",
                }}
              >
                {p.cta}
              </a>

              <div className="mt-6 border-t border-[#E6E6E6]" />

              <ul className="mt-6 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span className="mt-[2px] inline-flex size-5 items-center justify-center rounded-full bg-[#EEF3FF] text-[11px] font-bold text-[#3960F9]">
                      ✓
                    </span>
                    <span className="text-[14px] font-medium leading-[20px] text-[#555555]">
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <h2
            className="text-center text-[36px] font-semibold leading-[140%] text-[#000000]"
            style={{
              fontFamily:
                '"Inter Display", Inter, var(--font-sans), ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial',
            }}
          >
            FAQ
          </h2>
          <div className="mx-auto mt-10 max-w-3xl space-y-4">
            {FAQ.map((item) => (
              <div
                key={item.q}
                className="rounded-[16px] border border-[#E6E6E6] bg-white/70 p-6 shadow-sm"
              >
                <div className="text-[16px] font-semibold text-[#000000]">
                  {item.q}
                </div>
                <div className="mt-2 text-[15px] font-medium leading-[22px] text-[#555555]">
                  {item.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MarketingPageShell>
  );
}



