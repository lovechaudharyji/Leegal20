export function Hero() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 pb-20 pt-6 sm:pt-10">
      <div className="relative mx-auto max-w-4xl text-center">
        {/* Floating pills */}
        <CodePill className="-left-[115px] top-12 hidden sm:flex" />
        <TextPill className="-left-[40px] top-64 hidden sm:flex" />
        <ImagePill className="-right-[40px] top-56 hidden sm:flex" />
        <VideoPill className="-right-[115px] top-12 hidden sm:flex" />

        <div
          className="mx-auto inline-flex h-[40px] items-center justify-center gap-[5px] rounded-[99px] border border-black/6 bg-white/40 px-[12px] py-[6px] shadow-sm"
          style={{
            background:
              "radial-gradient(27.92% 100% at 50% 0%, rgba(57, 96, 249, 0.06) 0%, rgba(255, 255, 255, 0.00) 100%), rgba(255, 255, 255, 0.40)",
            borderColor: "rgba(0, 0, 0, 0.06)",
          }}
        >
          <img
            src="/ai-magic.svg"
            alt=""
            aria-hidden="true"
            className="size-[25px]"
          />
          <span className="text-[18px] font-semibold text-[#555555]">
            Powerful AI Tools
          </span>
        </div>

        <h1
          className="mx-auto mt-8 w-full max-w-[847.463px] text-center text-[40px] font-semibold leading-[1.05] sm:text-[58px] sm:leading-[1.25]"
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
          Launch Your US Business. Scale
          <br />
          Globally With Confidence.
        </h1>

        <div className="relative mx-auto mt-6 max-w-2xl">
          <p
            className="relative mx-auto w-full max-w-[465.732px] text-center text-[18px] font-medium leading-[24px] text-[#555555]"
            style={{
              fontFamily:
                '"Inter Display", Inter, var(--font-sans), ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial',
            }}
          >
            Build a fully compliant US LLC Designed for founders, dropshippers, Amazon sellers, and global entrepreneurs ready to operate at a professional level
          </p>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#"
            className="flex h-[52px] w-[143px] items-center justify-center rounded-[8px] px-[16px] py-[14px] text-sm font-semibold text-white"
            style={{
              background:
                "radial-gradient(27.92% 100% at 50% 0%, rgba(255, 255, 255, 0.24) 0%, rgba(255, 255, 255, 0.00) 100%), #3960F9",
              boxShadow:
                "0 1px 2px -1px rgba(9, 6, 63, 0.40), 0 1px 0 0 rgba(255, 255, 255, 0.16) inset, 0 0 0 1px #3960F9",
            }}
          >
            Start Your US LLC
          </a>

          <a
            href="#"
            className="animated-border inline-flex flex-col items-center justify-center gap-[10px] rounded-[8px] border border-white px-[16px] py-[18px] text-sm font-semibold text-black"
            style={{
              background: "rgba(67, 104, 249, 0.02)",
              boxShadow: "1px 2px 8px 0 rgba(0, 0, 0, 0.02)",
            }}
          >
            <svg
              className="animated-border__svg"
              viewBox="0 0 100 40"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <rect
                className="dash dash--head"
                x="1"
                y="1"
                width="98"
                height="38"
                rx="8"
                ry="8"
              />
            </svg>
            Watch How It Works
          </a>
        </div>

        {/* App preview frame (Figma node 10-8973) */}
        <AppPreview className="mt-12" />
      </div>
    </section>
  );
}

type AppPreviewProps = {
  className?: string;
};

function AppPreview({ className }: AppPreviewProps) {
  return (
    <div className={className}>
      <div
        className={[
          // responsive: shrink on small screens, exact size on xl+
          "mx-auto w-full max-w-[1080px] overflow-hidden rounded-[14px] border border-[#E6E6E6] bg-white",
          "shadow-[0_0_0_4px_rgba(255,255,255,0.25)]",
          // tighter height to avoid excessive empty space under the "Ask anything" box
          "h-[360px] sm:h-[420px] lg:h-[480px] xl:h-[520px]",
        ].join(" ")}
      >
        <div className="flex h-full">
          {/* Sidebar */}
          <aside className="hidden h-full w-[280px] flex-col border-r border-[#E6E6E6] bg-white p-4 lg:flex">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-full bg-zinc-950 text-xs font-semibold text-white">
                ⌁
              </div>
              <div className="text-sm font-semibold text-[#141B34]">Leegal Nation</div>
            </div>

            <div className="mt-6 space-y-2 text-[13px] text-[#141B34]">
              {[
                { label: "New chart", icon: <DotIcon /> },
                { label: "Search charts", icon: <SearchIcon /> },
                { label: "Library", icon: <BookIcon /> },
                { label: "Sora", icon: <SparkIcon /> },
                { label: "GPTs", icon: <GridIcon /> },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex items-center gap-2 rounded-lg px-2 py-2 text-[#141B34] hover:bg-zinc-50"
                >
                  <span className="text-[#959596]">{row.icon}</span>
                  <span>{row.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <div className="text-[11px] font-semibold text-[#959596]">
                Charts
              </div>
              <div className="mt-2 space-y-2 text-[12px] text-[#141B34]">
                {[
                  "Productivity Boost Ideas",
                  "Typo Assistance Request",
                  "Quadratic Function Plot",
                  "Urban Green Spaces",
                ].map((t) => (
                  <div key={t} className="truncate rounded-lg px-2 py-1.5">
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Main */}
          <div className="flex min-w-0 flex-1 flex-col">
            {/* Top bar */}
            <div className="flex items-center justify-between border-b border-[#E6E6E6] px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-full border border-[#E6E6E6] bg-white">
                  <FrameIcon />
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-[#141B34]">
                  Leegal Nation
                  <ChevronDownIcon />
                </div>
              </div>

              <div className="rounded-full bg-[#EEF3FF] px-3 py-1 text-xs font-semibold text-[#3960F9]">
                + Get Plus
              </div>

              <div className="flex items-center gap-2">
                <div className="rounded-full border border-[#E6E6E6] bg-white px-3 py-1 text-xs text-[#141B34]">
                  Temporary
                </div>
                <div className="flex size-8 items-center justify-center rounded-full bg-zinc-100 text-xs font-semibold text-[#141B34]">
                  F
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex min-h-0 flex-1 flex-col">
              <div className="flex min-h-0 flex-1 items-center justify-center px-6">
                <div className="w-full max-w-[720px] text-center">
                  <h3 className="text-[28px] font-semibold text-[#141B34] sm:text-[32px]">
                    What can I do to assist you?
                  </h3>

                  <div className="mt-8 rounded-2xl border border-[#E6E6E6] bg-white px-4 py-4 shadow-sm">
                    <div className="text-left text-xs text-[#959596]">
                      Ask anything
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs font-semibold text-[#141B34]">
                        <button className="inline-flex items-center gap-2 rounded-lg border border-[#E6E6E6] bg-white px-3 py-2">
                          <PlusSignIcon />
                          <span>Tools</span>
                        </button>
                        <button className="inline-flex items-center gap-2 rounded-lg border border-[#E6E6E6] bg-white px-3 py-2">
                          <FilterIcon />
                          <span>Filters</span>
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex size-9 items-center justify-center rounded-full border border-[#E6E6E6] bg-white">
                          <MicIcon />
                        </div>
                        <div className="flex size-9 items-center justify-center rounded-full bg-[#141B34] text-white">
                          <ArrowUpIcon />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom spacing like a real app */}
              <div className="h-10 border-t border-transparent" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="size-4 text-[#959596]"
    >
      <path d="M5.5 7.5a1 1 0 011.4 0L10 10.6l3.1-3.1a1 1 0 111.4 1.4l-3.8 3.8a1 1 0 01-1.4 0L5.5 8.9a1 1 0 010-1.4z" />
    </svg>
  );
}

function FrameIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-5">
      <path
        d="M7 6.5h10A2.5 2.5 0 0119.5 9v6A2.5 2.5 0 0117 17.5H7A2.5 2.5 0 014.5 15V9A2.5 2.5 0 017 6.5Z"
        stroke="#141B34"
        strokeWidth="1.6"
      />
      <path
        d="M9 12h6"
        stroke="#959596"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PlusSignIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="size-4">
      <path
        d="M10 4v12M4 10h12"
        stroke="#141B34"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="size-4">
      <path
        d="M4 6h12M6 10h8M8 14h4"
        stroke="#141B34"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MicIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-5">
      <path
        d="M12 14a3 3 0 003-3V7a3 3 0 10-6 0v4a3 3 0 003 3Z"
        stroke="#141B34"
        strokeWidth="1.6"
      />
      <path
        d="M7 11a5 5 0 0010 0"
        stroke="#141B34"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M12 16v3"
        stroke="#141B34"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArrowUpIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="size-4">
      <path d="M10 4l4.5 6H5.5L10 4Z" fill="currentColor" />
    </svg>
  );
}

function DotIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="size-4">
      <circle cx="10" cy="10" r="3" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="size-4">
      <path
        d="M8.5 14.5a6 6 0 116-6 6 6 0 01-6 6Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M13 13l4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="size-4">
      <path
        d="M5.5 4.5h7A2 2 0 0114.5 6.5v9h-7A2 2 0 015.5 13.5v-9Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M5.5 13.5h9" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="size-4">
      <path d="M10 2l1.2 4.1L15 7.4l-3.8 1.3L10 13l-1.2-4.3L5 7.4l3.8-1.3L10 2Z" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="size-4">
      <path d="M4 4h5v5H4V4Zm7 0h5v5h-5V4ZM4 11h5v5H4v-5Zm7 0h5v5h-5v-5Z" />
    </svg>
  );
}

function CodePill({ className }: { className?: string }) {
  return (
    <div className={["absolute", className ?? ""].join(" ")}>
      <div
        className="relative inline-flex -rotate-[6deg] items-center gap-2 rounded-[99px] border-[0.5px] border-white bg-[#DBECF5] px-[14px] py-[10px] text-xs font-semibold shadow-[0_1px_3px_0_rgba(0,0,0,0.04)]"
        style={{ transformOrigin: "center" }}
      >
        <img src="/code-folder.svg" alt="" aria-hidden="true" className="size-6" />
        <span className="text-[#00A5FB]">Legal Setup</span>
        <span className="absolute -right-5 top-full -mt-1">
          <img
            src="/cursor-code.svg"
            alt=""
            aria-hidden="true"
            className="size-[27px]"
          />
        </span>
      </div>
    </div>
  );
}

function TextPill({ className }: { className?: string }) {
  return (
    <div className={["absolute", className ?? ""].join(" ")}>
      <div className="relative inline-flex rotate-[6deg] items-center gap-[8px] rounded-[99px] border-[0.6px] border-white bg-[#E8E6F7] px-[14px] py-[10px] text-xs font-semibold shadow-[0_1px_3px_0_rgba(0,0,0,0.04)]">
        <img
          src="/text-creation.svg"
          alt=""
          aria-hidden="true"
          className="size-6"
        />
        <span className="text-[#8F79FF]">Banking & Payments</span>
        <span className="absolute -right-7 -top-5">
          <img
            src="/cursor-text.svg"
            alt=""
            aria-hidden="true"
            className="size-[27px]"
          />
        </span>
      </div>
    </div>
  );
}

function VideoPill({ className }: { className?: string }) {
  return (
    <div className={["absolute", className ?? ""].join(" ")}>
      <div className="relative inline-flex rotate-[6deg] items-center gap-[8px] rounded-[99px] border-[0.6px] border-white bg-[#F5ECD9] px-[14px] py-[10px] text-xs font-semibold shadow-[0_1px_3px_0_rgba(0,0,0,0.04)]">
        <img src="/youtube.svg" alt="" aria-hidden="true" className="size-6" />
        <span
          className="text-transparent"
          style={{
            background: "linear-gradient(180deg, #FFB21E 0%, #FAA706 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            WebkitTextFillColor: "transparent",
          }}
        >
          Suppliers
        </span>
        <span className="absolute -left-4 top-full -mt-1">
          <img
            src="/cursor-video.svg"
            alt=""
            aria-hidden="true"
            className="size-[27px]"
          />
        </span>
      </div>
    </div>
  );
}

function ImagePill({ className }: { className?: string }) {
  return (
    <div className={["absolute", className ?? ""].join(" ")}>
      <div className="relative inline-flex -rotate-[6deg] items-center gap-[8px] rounded-[99px] border-[0.6px] border-white bg-[#F0E3E2] px-[14px] py-[10px] text-xs font-semibold shadow-[0_1px_3px_0_rgba(0,0,0,0.04)]">
        <img src="/image-02.svg" alt="" aria-hidden="true" className="size-6" />
        <span className="text-[#F3785D]">Growth Tools</span>
        <span className="absolute -left-6 -top-5">
          <img
            src="/cursor-image.svg"
            alt=""
            aria-hidden="true"
            className="size-[27px]"
          />
        </span>
      </div>
    </div>
  );
}

