import type { ReactNode } from "react";

type Section8352Props = {
  className?: string;
  children?: ReactNode;
};

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
 * Figma node: 10-8352
 * Container:
 * - width: 1240
 * - height: 444
 * - radius: 24
 * - border: 3px solid #FFF
 * - background: #FBFBFB
 */
export function Section8352({ className, children }: Section8352Props) {
  return (
    <section className={["w-full", className ?? ""].join(" ")}>
      <div className="mx-auto w-full max-w-[1240px] px-6">
        <div
          className={[
            "relative w-full overflow-hidden rounded-[24px] border-[3px] border-white bg-[#FBFBFB]",
            "h-[444px]",
          ].join(" ")}
        >
          {/* Gradient accents (soft corners like the reference) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
          >
            {/* big soft white sweep */}
            <div className="absolute inset-0 bg-[radial-gradient(90%_120%_at_50%_40%,rgba(255,255,255,1)_0%,rgba(255,255,255,0.75)_55%,rgba(255,255,255,0)_100%)]" />
            {/* corner glows */}
            <div className="absolute -left-24 -top-24 h-[240px] w-[240px] rounded-full bg-[radial-gradient(circle_at_center,rgba(57,96,249,0.25)_0%,rgba(57,96,249,0)_70%)] blur-[1px]" />
            <div className="absolute -right-28 -bottom-28 h-[260px] w-[260px] rounded-full bg-[radial-gradient(circle_at_center,rgba(57,96,249,0.22)_0%,rgba(57,96,249,0)_72%)] blur-[1px]" />
            <div className="absolute -right-16 -top-20 h-[220px] w-[220px] rounded-full bg-[radial-gradient(circle_at_center,rgba(57,96,249,0.12)_0%,rgba(57,96,249,0)_72%)] blur-[1px]" />
            {/* subtle overall tint */}
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.0)_0%,rgba(57,96,249,0.08)_100%)]" />
          </div>

          {/* Content */}
          <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 text-center">
            {children ?? (
              <>
                <h3
                  className="text-center text-[36px] font-semibold leading-[120%] text-[#000000] sm:text-[44px]"
                  style={{
                    fontFamily:
                      '"Inter Display", Inter, var(--font-sans), ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial',
                  }}
                >
                  Join hundreds of millions of
                  <br />
                  Users and Try{" "}
                  <span className="text-[#3960F9]">Leegal Nation</span>
                  <br />
                  Today.
                </h3>

                <a
                  href="#"
                  className="mt-10 inline-flex h-[44px] items-center justify-center gap-2 rounded-[8px] px-6 text-sm font-semibold text-white"
                  style={{
                    background:
                      "radial-gradient(27.92% 100% at 50% 0%, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.00) 100%), #3960F9",
                    boxShadow:
                      "0 0.75px 1.5px -0.75px rgba(9, 6, 63, 0.40), 0 0.75px 0 0 rgba(255, 255, 255, 0.16) inset, 0 0 0 0.75px #3960F9",
                  }}
                >
                  Try Leegal Nation
                  <DiagonalArrowIcon className="size-5 text-white" />
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}


