"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, CalendarClock, RefreshCw, ShieldCheck, TriangleAlert } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PremiumLock } from "@/components/ui/premium-lock";
import { getSession } from "@/lib/localAuth";

const DEADLINES = [
  {
    title: "Annual Report Due Date",
    value: "Mar 31, 2026",
    helper: "Recommended: file 2–3 weeks early to avoid penalties.",
  },
  {
    title: "BOI Filing Status (FinCEN)",
    value: "In Progress",
    helper: "We’ll notify you when submission is complete.",
  },
] as const;

const STATUS = {
  standing: "Good Standing",
  action: "Action Required",
  actionReason: "BOI details need confirmation before filing.",
} as const;

export default function DashboardCompliancePage() {
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    getSession().then((session) => {
      setIsPremium(session?.plan === "premium");
    });
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1
            className="text-[28px] font-semibold leading-[1.15] text-[#141B34] sm:text-[32px]"
            style={{
              fontFamily:
                '"Inter Display", Inter, var(--font-sans), ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial',
            }}
          >
            Compliance & Annual Filings
          </h1>
          <p className="mt-2 text-[15px] font-medium text-muted-foreground">
            Track upcoming deadlines and keep your US LLC in good standing.
          </p>
        </div>
        <Button asChild className="rounded-xl">
          <Link href="/dashboard/support">
            Get help <ArrowUpRight className="size-4" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Upcoming deadlines */}
        <Card className="rounded-2xl lg:col-span-2">
          <CardHeader>
            <CardTitle>Upcoming deadlines</CardTitle>
            <CardDescription>Important filings to stay compliant.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {DEADLINES.map((d) => (
              <div key={d.title} className="rounded-2xl border border-border bg-muted/30 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-[#141B34]">{d.title}</div>
                    <div className="mt-2 text-[18px] font-semibold text-[#3960F9]">
                      {d.value}
                    </div>
                    <div className="mt-2 text-sm font-medium text-muted-foreground">
                      {d.helper}
                    </div>
                  </div>
                  <div className="inline-flex size-9 items-center justify-center rounded-xl bg-[#EEF3FF] text-[#3960F9]">
                    <CalendarClock className="size-4" />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Current status */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Current status</CardTitle>
            <CardDescription>Where you stand today.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-2xl border border-border bg-muted/30 p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#141B34]">
                  <ShieldCheck className="size-4 text-[#3960F9]" />
                  {STATUS.standing} ✔
                </div>
                <Badge variant="secondary" className="bg-[#EEF3FF] text-[#3960F9]">
                  Good
                </Badge>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-muted/30 p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#141B34]">
                  <TriangleAlert className="size-4 text-[#3960F9]" />
                  {STATUS.action} ⚠
                </div>
                <Badge variant="secondary" className="bg-[#F5F5F5] text-[#555555]">
                  Needs review
                </Badge>
              </div>
              <div className="mt-2 text-sm font-medium text-muted-foreground">
                {STATUS.actionReason}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Services Section */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Services</CardTitle>
          <CardDescription>File faster and reduce compliance risk.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <div className="rounded-2xl border border-border bg-white/60 p-4 shadow-sm">
            <div className="text-sm font-semibold text-[#141B34]">File Annual Report</div>
            <div className="mt-2 text-sm font-medium text-muted-foreground">
              We prepare and submit your annual report on time.
            </div>
            <PremiumLock isPremium={isPremium} triggerLabel="Upgrade to File">
              <Button className="mt-4 w-full rounded-xl">
                Start annual report <ArrowUpRight className="size-4" />
              </Button>
            </PremiumLock>
          </div>
          <div className="rounded-2xl border border-border bg-white/60 p-4 shadow-sm">
            <div className="text-sm font-semibold text-[#141B34]">BOI Filing Help</div>
            <div className="mt-2 text-sm font-medium text-muted-foreground">
              Get guided support for FinCEN BOI submission.
            </div>
            <PremiumLock isPremium={isPremium} triggerLabel="Upgrade for BOI Help">
              <Button variant="outline" className="mt-4 w-full rounded-xl">
                Get BOI help <ArrowUpRight className="size-4" />
              </Button>
            </PremiumLock>
          </div>
          <div className="rounded-2xl border border-border bg-white/60 p-4 shadow-sm">
            <div className="text-sm font-semibold text-[#141B34]">Registered Agent Renewal</div>
            <div className="mt-2 text-sm font-medium text-muted-foreground">
              Renew service to stay reachable for official notices.
            </div>
            <PremiumLock isPremium={isPremium} triggerLabel="Upgrade to Renew">
              <Button variant="outline" className="mt-4 w-full rounded-xl">
                Renew agent <RefreshCw className="size-4" />
              </Button>
            </PremiumLock>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}



