"use client";

import { ArrowUpRight, FileCheck2, Receipt, ShieldAlert, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const METRICS = [
  {
    title: "New signups (7d)",
    value: "128",
    helper: "+12% vs last week",
    icon: <Users className="size-4" />,
  },
  {
    title: "Pending filings",
    value: "23",
    helper: "Requires review / approval",
    icon: <FileCheck2 className="size-4" />,
    badge: { label: "Needs attention", variant: "secondary" as const },
  },
  {
    title: "Open tickets",
    value: "9",
    helper: "3 high priority",
    icon: <ShieldAlert className="size-4" />,
  },
  {
    title: "Revenue (MTD)",
    value: "$42.6k",
    helper: "Net of refunds",
    icon: <Receipt className="size-4" />,
  },
] as const;

const PENDING = [
  { id: "F-1042", customer: "Atlas Global LLC", type: "BOI Filing", sla: "Today", status: "Review" },
  { id: "F-1041", customer: "Nova Commerce LLC", type: "EIN Request", sla: "24h", status: "Review" },
  { id: "F-1039", customer: "Zen Market LLC", type: "State Filing", sla: "48h", status: "Draft" },
] as const;

export default function AdminPage() {
  const [metrics, setMetrics] = useState({
    newSignups: 0,
    pendingFilings: 0,
    revenue: "$42.6k",
    openTickets: 9
  });
  const [recentUsers, setRecentUsers] = useState<any[]>([]);
  const supabase = createClient();

  useEffect(() => {
    async function fetchData() {
      // Fetch new signups (last 7 days)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      
      const { count: newSignupsCount } = await supabase
        .from("users")
        .select("*", { count: 'exact', head: true })
        .gte("created_at", sevenDaysAgo.toISOString());

      // Fetch pending filings (businesses)
      const { count: pendingFilingsCount } = await supabase
        .from("businesses")
        .select("*", { count: 'exact', head: true })
        .neq("status", "Approved");

      // Fetch recent users
      const { data: usersData } = await supabase
        .from("users")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(3);

      setMetrics(prev => ({
        ...prev,
        newSignups: newSignupsCount || 0,
        pendingFilings: pendingFilingsCount || 0
      }));
      setRecentUsers(usersData || []);
    }
    fetchData();
  }, []);

  const dynamicMetrics = [
    {
      title: "New signups (7d)",
      value: metrics.newSignups.toString(),
      helper: "Last 7 days",
      icon: <Users className="size-4" />,
    },
    {
      title: "Pending filings",
      value: metrics.pendingFilings.toString(),
      helper: "Requires review / approval",
      icon: <FileCheck2 className="size-4" />,
      badge: { label: "Needs attention", variant: "secondary" as const },
    },
    {
      title: "Open tickets",
      value: metrics.openTickets.toString(),
      helper: "3 high priority",
      icon: <ShieldAlert className="size-4" />,
    },
    {
      title: "Revenue (MTD)",
      value: metrics.revenue,
      helper: "Net of refunds",
      icon: <Receipt className="size-4" />,
    },
  ];

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
              Admin console
            </h1>
            <p className="mt-2 text-[15px] font-medium text-muted-foreground">
              Monitor operations, review filings, and manage customers.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="rounded-xl">
              Export report
            </Button>
            <Button className="rounded-xl">
              Review queue <ArrowUpRight className="size-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {dynamicMetrics.map((m) => (
            <Card key={m.title} className="rounded-2xl">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <CardDescription className="text-xs">{m.title}</CardDescription>
                    <CardTitle className="mt-2 text-[22px]">{m.value}</CardTitle>
                  </div>
                  <div className="inline-flex size-9 items-center justify-center rounded-xl bg-[#EEF3FF] text-[#3960F9]">
                    {m.icon}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm font-medium text-muted-foreground">
                    {m.helper}
                  </div>
                  {m.badge && (
                    <Badge variant={m.badge.variant} className="rounded-md px-2 py-0.5 text-xs">
                      {m.badge.label}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Card className="rounded-2xl lg:col-span-2" id="filings">
            <CardHeader>
              <CardTitle>Pending filings</CardTitle>
              <CardDescription>Items awaiting review, approval, or submission.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>SLA</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {PENDING.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="font-semibold text-[#141B34]">{p.id}</TableCell>
                      <TableCell className="font-semibold text-[#141B34]">
                        {p.customer}
                      </TableCell>
                      <TableCell className="text-sm font-medium text-muted-foreground">
                        {p.type}
                      </TableCell>
                      <TableCell className="text-sm font-semibold text-[#3960F9]">
                        {p.sla}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" className="h-9 rounded-xl px-3">
                          Open
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="rounded-2xl" id="users">
            <CardHeader>
              <CardTitle>Recent users</CardTitle>
              <CardDescription>Latest signups and plan selection.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentUsers.length === 0 ? (
                <div className="py-4 text-center text-sm text-muted-foreground">
                  No recent users
                </div>
              ) : (
                recentUsers.map((u) => (
                  <div key={u.id} className="rounded-xl border border-border bg-muted/30 p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="truncate text-sm font-semibold text-[#141B34]">
                          {u.full_name}
                        </div>
                        <div className="truncate text-sm font-medium text-muted-foreground">
                          {u.email}
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-[#EEF3FF] text-[#3960F9]">
                        {u.plan}
                      </Badge>
                    </div>
                    <Separator className="my-3" />
                    <div className="text-xs font-semibold text-muted-foreground">
                      Created: {new Date(u.created_at).toLocaleDateString()}
                    </div>
                  </div>
                ))
              )}
              <Button variant="outline" className="w-full rounded-xl">
                Manage users
              </Button>
            </CardContent>
          </Card>
        </div>
    </div>
  );
}


