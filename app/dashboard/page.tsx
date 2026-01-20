"use client";

import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  BadgeCheck,
  Building2,
  Calendar,
  CreditCard,
  FileText,
  Hash,
  Landmark,
  Lock,
  Sparkles,
  Upload,
} from "lucide-react";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getSession, upgradeUser } from "@/lib/localAuth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const BUSINESS_STATUS = [
  {
    title: "LLC Formation Status",
    value: "Pending",
    helper: "We’re reviewing your documents before filing.",
    icon: <Building2 className="size-4" />,
    badgeClass: "bg-[#F5F5F5] text-[#555555]",
  },
  {
    title: "EIN Status",
    value: "In Progress",
    helper: "Draft prepared — awaiting confirmation.",
    icon: <Hash className="size-4" />,
    badgeClass: "bg-[#F5F5F5] text-[#555555]",
  },
  {
    title: "Bank Account Status",
    value: "Not Started",
    helper: "Start when EIN is generated.",
    icon: <Landmark className="size-4" />,
    badgeClass: "bg-[#F5F5F5] text-[#555555]",
  },
  {
    title: "Compliance Status",
    value: "Good",
    helper: "No urgent actions required.",
    icon: <BadgeCheck className="size-4" />,
    badgeClass: "bg-[#EEF3FF] text-[#3960F9]",
  },
] as const;

const TIMELINE = [
  { title: "Documents Submitted", status: "done" as const },
  { title: "State Filing", status: "current" as const },
  { title: "EIN Generated", status: "todo" as const },
  { title: "Bank Setup", status: "todo" as const },
  { title: "Compliance Ready", status: "todo" as const },
] as const;

export default function DashboardPage() {
  const [isPremium, setIsPremium] = useState(false);
  const [upgrading, setUpgrading] = useState(false);
  const [userId, setUserId] = useState("");
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        setIsPremium(session.plan === "premium");
        setUserId(session.userId);
      }
    });
  }, []);

  async function handleUpgrade() {
    if (!userId) return;
    setUpgrading(true);
    try {
      // Simulate processing delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await upgradeUser(userId);
      setIsPremium(true);
      toast.success("Successfully upgraded to Premium!");
      router.refresh();
    } catch (error) {
      console.error("Upgrade failed", error);
      toast.error("Upgrade failed. Please try again.");
    } finally {
      setUpgrading(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1
            className="text-[28px] font-semibold leading-[1.15] text-[#141B34] sm:text-[32px]"
            style={{
              fontFamily:
                '"Inter Display", Inter, var(--font-sans), ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial',
            }}
          >
            {isPremium ? "Your Premium Workspace" : "Your Workspace"}
          </h1>
          <p className="mt-2 text-[15px] font-medium text-muted-foreground">
            {isPremium
              ? "Everything is optimized for your business growth."
              : "Track formation, compliance, documents, and support in one place."}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline" className="rounded-xl">
            <Link href="/dashboard/documents">View documents</Link>
          </Button>
          <Button asChild className="rounded-xl">
            <Link href="/dashboard/support">
              Contact support <ArrowUpRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Free User Banner */}
      {!isPremium && (
        <div className="rounded-2xl border border-blue-100 bg-gradient-to-r from-[#EEF3FF] to-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-[#141B34]">Unlock your full potential</h2>
              <p className="mt-1 text-sm text-[#555555]">
                Get expedited filing, automated compliance, and priority support with Premium.
              </p>
            </div>
            <Button 
              onClick={handleUpgrade} 
              disabled={upgrading}
              className="bg-[#3960F9] text-white hover:bg-[#3960F9]/90 shadow-md shadow-blue-500/20"
            >
              {upgrading ? "Upgrading..." : "Upgrade to Premium"}
            </Button>
          </div>
        </div>
      )}

      {/* Business Status Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {BUSINESS_STATUS.map((s) => (
          <Card key={s.title} className="rounded-2xl border border-black/10 bg-white/60 shadow-sm backdrop-blur">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <CardDescription className="text-xs">{s.title}</CardDescription>
                  <div className="mt-2 flex items-center gap-2">
                    <CardTitle 
                      className="text-[20px] text-[#141B34]"
                      style={{
                        fontFamily: '"Inter Display", Inter, var(--font-sans), ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial',
                      }}
                    >
                      {s.value}
                    </CardTitle>
                    <Badge variant="secondary" className={s.badgeClass}>
                      {s.value}
                    </Badge>
                  </div>
                </div>
                <div className="inline-flex size-9 items-center justify-center rounded-xl bg-[#EEF3FF] text-[#3960F9]">
                  {s.icon}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-sm font-medium text-muted-foreground">
                {s.helper}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Premium Tools Section - Only for Premium Users */}
      {isPremium && (
        <div>
          <h2 className="mb-4 text-lg font-semibold text-[#141B34]"
            style={{
              fontFamily: '"Inter Display", Inter, var(--font-sans), ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial',
            }}
          >
            Premium Tools
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Card className="rounded-2xl border border-black/10 bg-white/60 shadow-sm backdrop-blur">
                  <CardHeader>
                      <div className="flex items-center justify-between">
                          <CardTitle style={{ fontFamily: '"Inter Display", Inter, var(--font-sans), ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial' }}>Compliance Scan</CardTitle>
                      </div>
                      <CardDescription>Automated state compliance checks.</CardDescription>
                  </CardHeader>
                  <CardContent>
                      <div className="flex items-center gap-2 text-green-600">
                          <BadgeCheck className="size-5" />
                          <span className="font-medium">All checks passed</span>
                      </div>
                  </CardContent>
              </Card>

              <Card className="rounded-2xl border border-black/10 bg-white/60 shadow-sm backdrop-blur">
                  <CardHeader>
                      <div className="flex items-center justify-between">
                          <CardTitle style={{ fontFamily: '"Inter Display", Inter, var(--font-sans), ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial' }}>Expedited Filing</CardTitle>
                      </div>
                      <CardDescription>Priority processing for your documents.</CardDescription>
                  </CardHeader>
                  <CardContent>
                       <div className="flex items-center gap-2 text-blue-600">
                          <Sparkles className="size-5" />
                          <span className="font-medium">Priority Active</span>
                      </div>
                  </CardContent>
              </Card>
          </div>
        </div>
      )}

      {/* Why Upgrade Section - Only for Free Users */}
      {!isPremium && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           <Card className="rounded-2xl border border-black/10 bg-white/60 shadow-sm backdrop-blur">
              <CardHeader>
                <CardTitle className="text-base">Compliance Scan</CardTitle>
                <CardDescription>Auto-detect issues</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Automatically checks state databases to ensure your LLC stays in good standing.
              </CardContent>
           </Card>
           <Card className="rounded-2xl border border-black/10 bg-white/60 shadow-sm backdrop-blur">
              <CardHeader>
                <CardTitle className="text-base">Expedited Filing</CardTitle>
                <CardDescription>24h processing</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Skip the line. We process your formation and filing documents within 24 hours.
              </CardContent>
           </Card>
           <Card className="rounded-2xl border border-black/10 bg-white/60 shadow-sm backdrop-blur">
              <CardHeader>
                <CardTitle className="text-base">Priority Support</CardTitle>
                <CardDescription>Direct expert access</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Get direct access to our legal and business experts whenever you have questions.
              </CardContent>
           </Card>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Quick Actions */}
        <Card className="rounded-2xl lg:col-span-2 border border-black/10 bg-white/60 shadow-sm backdrop-blur">
          <CardHeader>
            <CardTitle style={{ fontFamily: '"Inter Display", Inter, var(--font-sans), ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial' }}>Quick actions</CardTitle>
            <CardDescription>Finish key steps faster with one click.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <ActionCard
                title="Upload documents"
                desc="Add required files for verification."
                icon={<Upload className="size-4" />}
                href="/dashboard/documents"
                buttonLabel="Upload"
              />
              <ActionCard
                title="Book consultation"
                desc="Talk to an expert and confirm next steps."
                icon={<Calendar className="size-4" />}
                href="/dashboard/support"
                buttonLabel="Book"
              />
              <ActionCard
                title="Download certificates"
                desc="Get formation certificates and confirmations."
                icon={<FileText className="size-4" />}
                href="/dashboard/documents"
                buttonLabel="Download"
              />
              <ActionCard
                title="Make payment"
                desc="Pay invoices and unlock next steps."
                icon={<CreditCard className="size-4" />}
                href="/pricing"
                buttonLabel="Pay"
              />
            </div>
          </CardContent>
        </Card>

        {/* Timeline / Progress Tracker */}
        <Card className="rounded-2xl border border-black/10 bg-white/60 shadow-sm backdrop-blur">
          <CardHeader>
            <CardTitle style={{ fontFamily: '"Inter Display", Inter, var(--font-sans), ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial' }}>Progress tracker</CardTitle>
            <CardDescription>See where you are in the setup journey.</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="relative space-y-4">
              {TIMELINE.map((step, idx) => (
                <li key={step.title} className="relative pl-9">
                  {/* vertical line */}
                  {idx < TIMELINE.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className="absolute left-[15px] top-8 h-[calc(100%-16px)] w-px bg-black/10"
                    />
                  ) : null}

                  <span
                    className={[
                      "absolute left-0 top-1 inline-flex size-8 items-center justify-center rounded-full border",
                      step.status === "done"
                        ? "border-[#3960F9]/30 bg-[#EEF3FF] text-[#3960F9]"
                        : step.status === "current"
                          ? "border-[#3960F9] bg-white text-[#3960F9]"
                          : "border-black/10 bg-white text-[#555555]",
                    ].join(" ")}
                    aria-hidden="true"
                  >
                    {step.status === "done" ? "✓" : idx + 1}
                  </span>

                  <div className="text-sm font-semibold text-[#141B34]">
                    {step.title}
                  </div>
                  <div className="mt-1 text-sm font-medium text-muted-foreground">
                    {step.status === "done"
                      ? "Completed"
                      : step.status === "current"
                        ? "In progress"
                        : "Upcoming"}
                  </div>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ActionCard({
  title,
  desc,
  icon,
  href,
  buttonLabel,
}: {
  title: string;
  desc: string;
  icon: React.ReactNode;
  href: string;
  buttonLabel: string;
}) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white/60 p-4 shadow-sm backdrop-blur">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-semibold text-[#141B34]"
            style={{
               fontFamily: '"Inter Display", Inter, var(--font-sans), ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial',
            }}
          >
            {title}
          </div>
          <div className="mt-1 text-sm font-medium text-muted-foreground">{desc}</div>
        </div>
        <div className="inline-flex size-9 items-center justify-center rounded-xl bg-[#EEF3FF] text-[#3960F9]">
          {icon}
        </div>
      </div>
      <Button asChild variant="outline" className="mt-4 h-9 w-full rounded-xl">
        <Link href={href}>{buttonLabel}</Link>
      </Button>
    </div>
  );
}


