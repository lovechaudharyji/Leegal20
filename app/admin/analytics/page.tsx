"use client";

import { ArrowUpRight, BarChart3, TrendingUp, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminAnalyticsPage() {
  const [metrics, setMetrics] = useState({
    activeUsers: "...",
    conversion: "...",
    throughput: "..."
  });

  useEffect(() => {
    async function fetchMetrics() {
      const supabase = createClient();
      
      // Active users (Total users)
      const { count: usersCount } = await supabase
        .from("users")
        .select("*", { count: 'exact', head: true });
        
      // Premium users
      const { count: premiumCount } = await supabase
        .from("users")
        .select("*", { count: 'exact', head: true })
        .neq("plan", "free");

      // Approved businesses
      const { count: approvedCount } = await supabase
        .from("businesses")
        .select("*", { count: 'exact', head: true })
        .eq("status", "Approved");

      const conversionRate = usersCount ? ((premiumCount || 0) / usersCount * 100).toFixed(1) + "%" : "0%";
      
      setMetrics({
        activeUsers: usersCount?.toLocaleString() || "0",
        conversion: conversionRate,
        throughput: approvedCount?.toString() || "0"
      });
    }
    fetchMetrics();
  }, []);

  const metricCards = [
    { title: "Active users", value: metrics.activeUsers, helper: "Total registered", icon: <Users className="size-4" /> },
    { title: "Conversion", value: metrics.conversion, helper: "Premium users", icon: <TrendingUp className="size-4" /> },
    { title: "Approved Businesses", value: metrics.throughput, helper: "Formations completed", icon: <BarChart3 className="size-4" /> },
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
            Analytics
          </h1>
          <p className="mt-2 text-[15px] font-medium text-muted-foreground">
            Track growth and operational performance.
          </p>
        </div>
        <Button className="rounded-xl">
          Export <ArrowUpRight className="size-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {metricCards.map((m) => (
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
              <div className="text-sm font-medium text-muted-foreground">{m.helper}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="rounded-2xl">
        <CardHeader>
          <div className="flex items-start justify-between gap-3">
            <div>
              <CardTitle>Overview chart</CardTitle>
              <CardDescription>Placeholder chart section (wire to real data later).</CardDescription>
            </div>
            <Badge variant="secondary" className="bg-[#EEF3FF] text-[#3960F9]">
              Last 30 days
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[260px] w-full rounded-2xl border border-border bg-white/60" />
        </CardContent>
      </Card>
    </div>
  );
}



