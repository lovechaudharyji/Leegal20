"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  Bell,
  FileText,
  ShieldAlert,
  Wallet,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type NotificationType =
  | "Filing updates"
  | "Payment reminders"
  | "Compliance alerts"
  | "Document uploaded";

type NotificationRow = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  unread: boolean;
};

const SECTIONS: readonly NotificationType[] = [
  "Filing updates",
  "Payment reminders",
  "Compliance alerts",
  "Document uploaded",
] as const;

const SAMPLE: readonly NotificationRow[] = [
  {
    id: "n-1",
    type: "Filing updates",
    title: "State filing moved to review",
    message: "Your LLC state filing is now under review. We’ll notify you once it’s accepted.",
    time: "Today • 2h ago",
    unread: true,
  },
  {
    id: "n-2",
    type: "Payment reminders",
    title: "Invoice due soon",
    message: "EIN service invoice is pending. Paying now helps avoid delays.",
    time: "Yesterday",
    unread: true,
  },
  {
    id: "n-3",
    type: "Compliance alerts",
    title: "BOI details needed",
    message: "Please confirm beneficiary details to complete your FinCEN BOI filing.",
    time: "Jan 14, 2026",
    unread: false,
  },
  {
    id: "n-4",
    type: "Document uploaded",
    title: "Operating Agreement uploaded",
    message: "We received your Operating Agreement. You can download it anytime from Documents Center.",
    time: "Jan 12, 2026",
    unread: false,
  },
] as const;

function iconFor(type: NotificationType) {
  switch (type) {
    case "Filing updates":
      return <FileText className="size-4" />;
    case "Payment reminders":
      return <Wallet className="size-4" />;
    case "Compliance alerts":
      return <ShieldAlert className="size-4" />;
    case "Document uploaded":
      return <FileText className="size-4" />;
    default:
      return <Bell className="size-4" />;
  }
}

function badgeClass(type: NotificationType) {
  switch (type) {
    case "Compliance alerts":
      return "bg-[#F5F5F5] text-[#555555]";
    default:
      return "bg-[#EEF3FF] text-[#3960F9]";
  }
}

export function NotificationsCenter() {
  const [active, setActive] = useState<NotificationType | "All">("All");
  const [rows, setRows] = useState<NotificationRow[]>([...SAMPLE]);

  const unreadCount = useMemo(() => rows.filter((r) => r.unread).length, [rows]);

  const filtered = useMemo(() => {
    if (active === "All") return rows;
    return rows.filter((r) => r.type === active);
  }, [rows, active]);

  function markAllRead() {
    setRows((prev) => prev.map((r) => ({ ...r, unread: false })));
  }

  function dismiss(id: string) {
    setRows((prev) => prev.filter((r) => r.id !== id));
  }

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
            Notifications
          </h1>
          <p className="mt-2 text-[15px] font-medium text-muted-foreground">
            Stay updated on filings, payments, compliance, and documents.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="bg-[#EEF3FF] text-[#3960F9]">
            {unreadCount} unread
          </Badge>
          <Button variant="outline" className="rounded-xl" onClick={markAllRead}>
            Mark all read
          </Button>
        </div>
      </div>

      <Card className="rounded-2xl">
        <CardHeader className="pb-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Notification Center</CardTitle>
              <CardDescription>Filter by type and take action quickly.</CardDescription>
            </div>
            <Button className="rounded-xl">
              Go to dashboard <ArrowUpRight className="size-4" />
            </Button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {(["All", ...SECTIONS] as const).map((t) => {
              const selected = t === active;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setActive(t)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold transition",
                    selected
                      ? "border-[#3960F9]/30 bg-[#EEF3FF] text-[#3960F9]"
                      : "border-black/10 bg-white/60 text-[#555555] hover:bg-white",
                  )}
                >
                  {t === "All" ? <Bell className="size-4" /> : iconFor(t)}
                  {t}
                </button>
              );
            })}
          </div>
        </CardHeader>

        <CardContent>
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-black/10 bg-white/60 p-6 text-center text-sm font-medium text-muted-foreground">
              No notifications here yet.
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((n) => (
                <div
                  key={n.id}
                  className={cn(
                    "rounded-2xl border border-border bg-white/60 p-4 shadow-sm",
                    n.unread && "ring-1 ring-[#3960F9]/15",
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-start gap-3">
                      <div className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#EEF3FF] text-[#3960F9]">
                        {iconFor(n.type)}
                      </div>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <div className="truncate text-sm font-semibold text-[#141B34]">
                            {n.title}
                          </div>
                          <Badge variant="secondary" className={badgeClass(n.type)}>
                            {n.type}
                          </Badge>
                          {n.unread ? (
                            <Badge variant="secondary" className="bg-[#EEF3FF] text-[#3960F9]">
                              New
                            </Badge>
                          ) : null}
                        </div>
                        <div className="mt-2 text-sm font-medium text-muted-foreground">
                          {n.message}
                        </div>
                        <div className="mt-2 text-xs font-medium text-[#555555]">{n.time}</div>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      size="icon"
                      className="h-9 w-9 rounded-xl border-black/10 bg-white/60 hover:bg-white"
                      aria-label="Dismiss notification"
                      onClick={() => dismiss(n.id)}
                    >
                      <X className="size-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}



