import { MarketingPageShell } from "../components/MarketingPageShell";

const ENTERPRISE_FEATURES = [
  {
    title: "Dedicated onboarding",
    desc: "A structured kickoff, document checklist, and timeline tailored to your team’s needs.",
  },
  {
    title: "Compliance controls",
    desc: "Standardized documentation, audit trails, and reminders for ongoing obligations.",
  },
  {
    title: "Priority support",
    desc: "Fast response times, escalation paths, and a single point of contact.",
  },
  {
    title: "Security & privacy",
    desc: "Least-privilege access practices and secure handling of sensitive data.",
  },
] as const;

const STEPS = [
  {
    step: "01",
    title: "Scope",
    desc: "We map entities, states, timelines, and stakeholders to create a clear plan.",
  },
  {
    step: "02",
    title: "Setup",
    desc: "We prepare filings, request EIN, and align banking/payment setup to your workflow.",
  },
  {
    step: "03",
    title: "Operate",
    desc: "We provide ongoing compliance reminders and documentation best practices.",
  },
] as const;

export default function EnterprisePage() {
  return (
    <MarketingPageShell
      activeNav="Enterprise"
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
                Enterprise-grade
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
              Compliance and operations
              <br />
              for teams at scale
            </h1>

            <p
              className="mx-auto mt-6 w-full max-w-[620px] text-center text-[18px] font-medium leading-[24px] text-[#555555]"
              style={{
                fontFamily:
                  '"Inter Display", Inter, var(--font-sans), ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial',
              }}
            >
              Standardized filings, secure workflows, and reliable timelines for companies
              with multiple stakeholders and higher compliance requirements.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#"
                className="flex h-[52px] w-[160px] items-center justify-center rounded-[8px] px-[16px] py-[14px] text-sm font-semibold text-white"
                style={{
                  background:
                    "radial-gradient(27.92% 100% at 50% 0%, rgba(255, 255, 255, 0.24) 0%, rgba(255, 255, 255, 0.00) 100%), #3960F9",
                  boxShadow:
                    "0 1px 2px -1px rgba(9, 6, 63, 0.40), 0 1px 0 0 rgba(255, 255, 255, 0.16) inset, 0 0 0 1px #3960F9",
                }}
              >
                Talk to Sales
              </a>
              <a
                href="/pricing"
                className="inline-flex h-[52px] w-[160px] items-center justify-center rounded-[8px] border border-white bg-[rgba(67,104,249,0.02)] px-[16px] py-[14px] text-sm font-semibold text-black shadow-[1px_2px_8px_0_rgba(0,0,0,0.02)] transition hover:bg-white/70"
              >
                View Pricing
              </a>
            </div>
          </div>
        </section>
      }
    >
      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {ENTERPRISE_FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-[16px] border border-[#F4F4F4] bg-white/60 p-6 shadow-sm backdrop-blur-[2px]"
            >
              <div className="flex items-start gap-3">
                <span className="mt-1 inline-flex size-6 items-center justify-center rounded-full bg-[#EEF3FF] text-xs font-bold text-[#3960F9]">
                  ✓
                </span>
                <div>
                  <div className="text-[18px] font-semibold text-[#000000]">
                    {f.title}
                  </div>
                  <div className="mt-2 text-[15px] font-medium leading-[22px] text-[#555555]">
                    {f.desc}
                  </div>
                </div>
              </div>
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
            How enterprise onboarding works
          </h2>
          <p
            className="mx-auto mt-4 max-w-[720px] text-center text-[18px] font-medium text-[#555555]"
            style={{
              fontFamily:
                '"Inter Display", Inter, var(--font-sans), ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial',
              lineHeight: "normal",
            }}
          >
            A clear process built for predictable timelines and stakeholder visibility.
          </p>

          <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
            {STEPS.map((s) => (
              <div
                key={s.step}
                className="rounded-[16px] border border-[#E6E6E6] bg-white/70 p-6 shadow-sm"
              >
                <div className="text-[12px] font-bold tracking-[0.12em] text-[#3960F9]">
                  {s.step}
                </div>
                <div className="mt-2 text-[18px] font-semibold text-[#000000]">
                  {s.title}
                </div>
                <div className="mt-2 text-[15px] font-medium leading-[22px] text-[#555555]">
                  {s.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 rounded-[24px] border-[3px] border-white bg-[#FBFBFB] px-6 py-14 text-center shadow-sm">
          <h3
            className="text-[32px] font-semibold leading-[120%] text-[#000000] sm:text-[44px]"
            style={{
              fontFamily:
                '"Inter Display", Inter, var(--font-sans), ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial',
            }}
          >
            Ready for an enterprise setup?
          </h3>
          <p className="mx-auto mt-4 max-w-[700px] text-[18px] font-medium text-[#555555]">
            Tell us your timeline and requirements — we’ll propose the best path to
            formation, banking, and compliance for your team.
          </p>
          <a
            href="#"
            className="mt-8 inline-flex h-[44px] items-center justify-center rounded-[8px] px-6 text-sm font-semibold text-white"
            style={{
              background:
                "radial-gradient(27.92% 100% at 50% 0%, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.00) 100%), #3960F9",
              boxShadow:
                "0 0.75px 1.5px -0.75px rgba(9, 6, 63, 0.40), 0 0.75px 0 0 rgba(255, 255, 255, 0.16) inset, 0 0 0 0.75px #3960F9",
            }}
          >
            Contact Sales
          </a>
        </div>
      </section>
    </MarketingPageShell>
  );
}



