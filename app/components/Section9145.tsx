import type { ReactNode } from "react";

type Section9145Props = {
  className?: string;
  children?: ReactNode;
  reverse?: boolean;
  title?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
};

const PANEL_CLOUDS = [
  {
    key: "a",
    style: {
      width: "174.094px",
      height: "100.424px",
      top: "156px",
      right: "-8.2px",
      opacity: 0.9,
      mixBlendMode: "screen" as const,
      backgroundImage: "url(/cloud-020-a.png)",
      backgroundPosition: "50% 50%",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    },
  },
  {
    key: "b",
    style: {
      width: "307.359px",
      height: "100.424px",
      top: "327px",
      left: "-59px",
      opacity: 0.9,
      mixBlendMode: "screen" as const,
      backgroundImage: "url(/cloud-020-b.png)",
      backgroundPosition: "-3.353px 0px",
      backgroundSize: "103.046% 100%",
      backgroundRepeat: "no-repeat",
    },
  },
  {
    key: "c",
    style: {
      width: "307.359px",
      height: "100.424px",
      right: "-89px",
      bottom: "-44px",
      opacity: 0.9,
      mixBlendMode: "screen" as const,
      backgroundImage: "url(/cloud-020-c.png)",
      backgroundPosition: "-3.353px 0px",
      backgroundSize: "103.046% 100%",
      backgroundRepeat: "no-repeat",
    },
  },
] as const;

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

/**
 * Figma nodes:
 * - 10-9145: Heading
 * - 10-9146: Description
 * - 10-9147: Button
 * - 10-9155: Right preview panel
 */
function renderMultiline(text: string) {
  return text.split("\n").map((line, idx, arr) => (
    // eslint-disable-next-line react/no-array-index-key
    <span key={idx}>
      {line}
      {idx < arr.length - 1 ? <br /> : null}
    </span>
  ));
}

export function Section9145({
  className,
  reverse = false,
  title = "Type, talk, and use it\nyour way",
  description = "With Leegal Nation, you can type or start a real-time voice conversation by tapping the soundwave icon in the mobile app.",
  buttonText = "Learn More",
  buttonHref = "#",
}: Section9145Props) {
  return (
    <section className={["w-full", className ?? ""].join(" ")}>
      <div className="mx-auto w-full max-w-7xl px-5">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: copy */}
            <div
              className={[
                "w-full max-w-[420px] justify-self-center",
                reverse ? "lg:order-2 lg:justify-self-end" : "lg:order-1 lg:justify-self-start",
              ].join(" ")}
            >
            <h3
              className="w-full max-w-[332.365px] text-left text-[36px] font-bold leading-[42px] text-[#000000] lg:text-left"
              style={{
                fontFamily:
                  '"Inter Display", Inter, var(--font-sans), ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial',
              }}
            >
              {renderMultiline(title)}
            </h3>

            <p
              className="mt-4 w-full max-w-[409.369px] text-left text-[18px] font-medium leading-[24px] text-[#555555]"
              style={{
                fontFamily:
                  '"Inter Display", Inter, var(--font-sans), ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial',
              }}
            >
              {renderMultiline(description)}
            </p>

            <a
              href={buttonHref}
              className="mt-6 inline-flex h-[39px] w-[117px] items-center justify-center gap-2 rounded-[6px] px-[12px]"
              style={{
                background:
                  "radial-gradient(27.92% 100% at 50% 0%, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.00) 100%), #3960F9",
                boxShadow:
                  "0 0.75px 1.5px -0.75px rgba(9, 6, 63, 0.40), 0 0.75px 0 0 rgba(255, 255, 255, 0.16) inset, 0 0 0 0.75px #3960F9",
              }}
            >
              <span className="text-[12px] font-semibold text-white">
                {buttonText}
              </span>
              <DiagonalArrowIcon className="size-[15px] text-white" />
            </a>
          </div>

          {/* Right: preview panel */}
            <div
              className={[
                "w-full max-w-[580px] justify-self-center",
                reverse ? "lg:order-1 lg:justify-self-start" : "lg:order-2 lg:justify-self-end",
              ].join(" ")}
            >
            <div
              className={[
                "relative overflow-hidden rounded-[24px] border-[3px] border-white",
                "h-[460px] w-full",
                "bg-[#FBFBFB]",
                "bg-[linear-gradient(180deg,rgba(57,96,249,0)_0%,rgba(57,96,249,0.35)_100%)]",
              ].join(" ")}
            >
              {/* Soft sky/cloud feel (approx) */}
              <div
                aria-hidden="true"
                className={[
                  "pointer-events-none absolute inset-0 z-0 opacity-60",
                  "bg-[radial-gradient(55%_70%_at_20%_70%,rgba(255,255,255,0.85)_0%,rgba(255,255,255,0)_60%),radial-gradient(60%_80%_at_70%_80%,rgba(255,255,255,0.75)_0%,rgba(255,255,255,0)_62%),radial-gradient(50%_60%_at_50%_35%,rgba(250,250,250,1)_0%,rgba(250,250,250,0)_55%)]",
                ].join(" ")}
              />

              {/* Cloud PNG layers (Figma: 10-9253/10-9254/10-9255) */}
              {PANEL_CLOUDS.map((c) => (
                <div
                  key={c.key}
                  aria-hidden="true"
                  className="pointer-events-none absolute z-10"
                  style={c.style}
                />
              ))}

              {/* Inner white "screen" */}
              <div className="absolute left-1/2 top-1/2 z-20 w-[82%] max-w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-[18px] bg-white p-6 shadow-[0_18px_60px_rgba(16,24,40,0.12)]">
                <div className="text-center text-[10px] font-semibold text-[#000000]/60">
                  Choose a voice
                </div>

                <div className="mt-6 flex justify-center gap-1.5">
                  <span className="size-3 rounded-full bg-black" />
                  <span className="size-3 rounded-full bg-black" />
                  <span className="size-3 rounded-full bg-black" />
                  <span className="size-3 rounded-full bg-black" />
                  <span className="size-3 rounded-full bg-black" />
                </div>

                <div className="mt-6 flex items-center justify-center gap-6 text-[9px] font-medium text-[#555555]">
                  <span className="opacity-50">Monday</span>
                  <span className="text-black">Juniper</span>
                  <span className="opacity-50">Friday</span>
                </div>

                <div className="mt-6 flex justify-center">
                  <div className="rounded-full bg-black px-10 py-2 text-[10px] font-semibold text-white">
                    Continue
                  </div>
                </div>
              </div>

              {/* subtle inset highlight */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-30 rounded-[24px]"
                style={{
                  boxShadow:
                    "0 0 0 1px rgba(255, 255, 255, 0.75) inset, 0 0 0 1px rgba(228, 235, 241, 0.6)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


