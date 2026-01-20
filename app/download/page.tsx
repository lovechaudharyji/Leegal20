import { MarketingPageShell } from "../components/MarketingPageShell";

const DOWNLOADS = [
  {
    title: "Web App",
    desc: "Access your dashboard instantly from any browser.",
    cta: "Open Web App",
    href: "/",
    badge: "Recommended",
  },
  {
    title: "Desktop",
    desc: "Best for focused work and faster navigation.",
    cta: "Download for Windows",
    href: "#",
    badge: "Beta",
  },
  {
    title: "iOS",
    desc: "Review status updates and documents on the go.",
    cta: "Get on App Store",
    href: "#",
  },
  {
    title: "Android",
    desc: "Stay on top of checklists, deadlines, and updates.",
    cta: "Get on Google Play",
    href: "#",
  },
] as const;

const FAQ = [
  {
    q: "Do I need to install anything to get started?",
    a: "No. The web app works immediately. Desktop and mobile downloads are optional.",
  },
  {
    q: "Will my data sync across devices?",
    a: "Yes — your account syncs your progress, documents, and checklist updates.",
  },
  {
    q: "Is there a cost to download?",
    a: "Downloads are free. Your plan determines the services and support you receive.",
  },
] as const;

export default function DownloadPage() {
  return (
    <MarketingPageShell
      activeNav="Download"
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
                Download & access anywhere
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
              Use Leegal Nation on
              <br />
              every device
            </h1>

            <p
              className="mx-auto mt-6 w-full max-w-[620px] text-center text-[18px] font-medium leading-[24px] text-[#555555]"
              style={{
                fontFamily:
                  '"Inter Display", Inter, var(--font-sans), ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial',
              }}
            >
              Start on web, then add desktop or mobile whenever you need faster workflows
              and on-the-go updates.
            </p>
          </div>
        </section>
      }
    >
      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {DOWNLOADS.map((d) => (
            <div
              key={d.title}
              className="rounded-[16px] border border-[#E6E6E6] bg-white/70 p-6 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-[18px] font-semibold text-[#000000]">
                    {d.title}
                  </div>
                  <div className="mt-2 text-[15px] font-medium leading-[22px] text-[#555555]">
                    {d.desc}
                  </div>
                </div>
                {"badge" in d ? (
                  <span className="rounded-full bg-[#EEF3FF] px-3 py-1 text-xs font-semibold text-[#3960F9]">
                    {d.badge}
                  </span>
                ) : null}
              </div>

              <a
                href={d.href}
                className="mt-6 inline-flex h-[44px] items-center justify-center rounded-[8px] px-6 text-sm font-semibold text-white"
                style={{
                  background:
                    "radial-gradient(27.92% 100% at 50% 0%, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.00) 100%), #3960F9",
                  boxShadow:
                    "0 0.75px 1.5px -0.75px rgba(9, 6, 63, 0.40), 0 0.75px 0 0 rgba(255, 255, 255, 0.16) inset, 0 0 0 0.75px #3960F9",
                }}
              >
                {d.cta}
              </a>
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



