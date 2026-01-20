export type ResourceCategory =
  | "EIN"
  | "Stripe"
  | "US Tax Basics"
  | "Business Tips";

export type Resource = {
  slug: string;
  category: ResourceCategory;
  title: string;
  description: string;
  readTime: string;
  body: readonly { heading: string; points: readonly string[] }[];
};

export const RESOURCES: readonly Resource[] = [
  {
    slug: "how-to-use-ein",
    category: "EIN",
    title: "How to use your EIN",
    description:
      "What an EIN is used for, when you’ll need it, and how to avoid common mistakes.",
    readTime: "6 min",
    body: [
      {
        heading: "What an EIN is",
        points: [
          "Your EIN is the federal tax ID for your LLC (like a business SSN).",
          "You’ll use it for banking, payments, hiring, and tax reporting.",
        ],
      },
      {
        heading: "Where you’ll use it",
        points: [
          "Business bank account applications",
          "Stripe and payment processor verification",
          "W‑9 / onboarding forms with suppliers or platforms",
          "State and federal tax registrations (when applicable)",
        ],
      },
      {
        heading: "Common pitfalls",
        points: [
          "Using the wrong legal name (must match your LLC formation docs)",
          "Confusing EIN with state file number",
          "Submitting mismatched business address between providers",
        ],
      },
    ],
  },
  {
    slug: "open-stripe-for-us-llc",
    category: "Stripe",
    title: "How to open Stripe for your US LLC",
    description:
      "A founder-friendly setup guide: verification, documents, and payout readiness.",
    readTime: "7 min",
    body: [
      {
        heading: "Before you start",
        points: [
          "Have your LLC name, EIN, and business address ready.",
          "Prepare documents like state certificate and operating agreement.",
        ],
      },
      {
        heading: "Account setup checklist",
        points: [
          "Create account and choose business type: LLC",
          "Add representative details (owner/manager)",
          "Connect bank account (Mercury/Wise where supported)",
          "Submit verification documents when requested",
        ],
      },
      {
        heading: "Best practices",
        points: [
          "Use a consistent address across Stripe and banking",
          "Avoid high-risk product descriptions and unclear refund policy",
          "Configure disputes, receipts, and payout schedule early",
        ],
      },
    ],
  },
  {
    slug: "us-tax-basics-for-global-founders",
    category: "US Tax Basics",
    title: "US tax basics (simple overview)",
    description:
      "A high-level, non-legal overview to help you understand the moving parts.",
    readTime: "5 min",
    body: [
      {
        heading: "Core concepts",
        points: [
          "LLC taxes depend on ownership, elections, and activity type.",
          "Some founders need ongoing filings even with $0 revenue.",
        ],
      },
      {
        heading: "Typical items to track",
        points: [
          "Revenue and expenses (keep clean bookkeeping)",
          "Bank statements and invoices",
          "Owner/beneficiary info for compliance where required",
        ],
      },
      {
        heading: "When to get help",
        points: [
          "If you have US customers + sales tax exposure",
          "If you’re unsure about withholding or treaty questions",
          "If your LLC structure changes (new partners, elections, etc.)",
        ],
      },
    ],
  },
  {
    slug: "business-tips-to-avoid-account-holds",
    category: "Business Tips",
    title: "Business tips to avoid payment holds",
    description:
      "Practical steps that reduce platform risk and keep accounts healthy.",
    readTime: "4 min",
    body: [
      {
        heading: "Reduce risk signals",
        points: [
          "Publish clear refund + shipping policies",
          "Use consistent branding across website, invoices, and descriptors",
          "Avoid sudden volume spikes without notice",
        ],
      },
      {
        heading: "Operational hygiene",
        points: [
          "Keep documentation ready (state certificate, EIN letter, IDs)",
          "Track chargebacks and improve customer support response times",
          "Use a dedicated business address and business email domain",
        ],
      },
    ],
  },
] as const;



