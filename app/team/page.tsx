import { MarketingPageShell } from "../components/MarketingPageShell";

function GradientHeading({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        background:
          "linear-gradient(90deg, #666666 0%, #000000 30%, #000000 70%, #666666 100%)",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        color: "transparent",
        WebkitTextFillColor: "transparent",
      }}
    >
      {children}
    </span>
  );
}

const TEAM = [
  {
    name: "Aisha Rahman",
    role: "Head of Compliance",
    bio: "Ensures every formation and filing meets US requirements and stays audit-ready.",
  },
  {
    name: "Daniel Park",
    role: "Operations Lead",
    bio: "Builds repeatable systems for fast turnaround times and smooth client onboarding.",
  },
  {
    name: "Maya Chen",
    role: "Customer Success",
    bio: "Guides founders through formation, banking, and ongoing compliance with clarity.",
  },
] as const;

const VALUES = [
  {
    title: "Clarity first",
    desc: "We turn complex legal steps into simple, predictable checklists you can trust.",
  },
  {
    title: "Compliance by design",
    desc: "Every workflow is built around correctness, documentation, and long-term protection.",
  },
  {
    title: "Founder empathy",
    desc: "Global founders need speed and certainty — we optimize for both.",
  },
] as const;

export default function TeamPage() {
  return (
    <MarketingPageShell
      activeNav="Team"
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
                Built for founders
              </span>
            </div>

            <h1
              className="mx-auto mt-8 w-full max-w-[900px] text-center text-[40px] font-semibold leading-[1.05] sm:text-[58px] sm:leading-[1.25]"
              style={{
                fontFamily:
                  '"Inter Display", Inter, var(--font-sans), ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial',
              }}
            >
              <GradientHeading>Meet the team</GradientHeading>
              <br />
              behind Leegal Nation
            </h1>

            <p
              className="mx-auto mt-6 w-full max-w-[560px] text-center text-[18px] font-medium leading-[24px] text-[#555555]"
              style={{
                fontFamily:
                  '"Inter Display", Inter, var(--font-sans), ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial',
              }}
            >
              We’re a compliance-first group of operators helping global founders register
              and run US businesses with confidence.
            </p>
          </div>
        </section>
      }
    >
      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {TEAM.map((m) => (
            <div
              key={m.name}
              className="rounded-[16px] border border-[#E6E6E6] bg-white/70 p-6 shadow-sm"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div
                    className="text-[18px] font-semibold text-[#000000]"
                    style={{
                      fontFamily:
                        '"Inter Display", Inter, var(--font-sans), ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial',
                    }}
                  >
                    {m.name}
                  </div>
                  <div className="mt-1 text-[14px] font-medium text-[#3960F9]">
                    {m.role}
                  </div>
                </div>
                <div className="flex size-10 items-center justify-center rounded-full bg-[#EEF3FF] text-sm font-semibold text-[#3960F9]">
                  {m.name.slice(0, 1)}
                </div>
              </div>
              <p className="mt-4 text-[15px] font-medium leading-[22px] text-[#555555]">
                {m.bio}
              </p>
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
            Our values
          </h2>
          <p
            className="mx-auto mt-4 max-w-[640px] text-center text-[18px] font-medium text-[#555555]"
            style={{
              fontFamily:
                '"Inter Display", Inter, var(--font-sans), ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial',
              lineHeight: "normal",
            }}
          >
            A simple set of principles that keep the experience fast, reliable, and
            founder-friendly.
          </p>

          <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="rounded-[16px] border border-[#F4F4F4] bg-white/60 p-6 shadow-sm backdrop-blur-[2px]"
              >
                <div className="text-[18px] font-semibold text-[#000000]">
                  {v.title}
                </div>
                <div className="mt-2 text-[15px] font-medium leading-[22px] text-[#555555]">
                  {v.desc}
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
            Want to work with us?
          </h3>
          <p className="mx-auto mt-4 max-w-[640px] text-[18px] font-medium text-[#555555]">
            We’re always looking for operators who care about accuracy, speed, and
            customer trust.
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
            See open roles
          </a>
        </div>
      </section>
    </MarketingPageShell>
  );
}



