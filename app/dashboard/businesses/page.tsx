"use client";

import Link from "next/link";
import { ArrowUpRight, Building2, Calendar, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { getSession } from "@/lib/localAuth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const BUSINESSES = [
  {
    id: "atlas-global-llc",
    name: "Atlas Global LLC",
    state: "Delaware",
    formationDate: "Jan 10, 2026",
    status: "Pending",
  },
  {
    id: "nova-commerce-llc",
    name: "Nova Commerce LLC",
    state: "Wyoming",
    formationDate: "Dec 22, 2025",
    status: "Filed",
  },
  {
    id: "zen-market-llc",
    name: "Zen Market LLC",
    state: "New Mexico",
    formationDate: "Nov 18, 2025",
    status: "Approved",
  },
] as const;

function StatusBadge({ status }: { status: string }) {
  const cls =
    status === "Approved"
      ? "bg-[#EEF3FF] text-[#3960F9]"
      : "bg-[#F5F5F5] text-[#555555]";
  return (
    <Badge variant="secondary" className={cls}>
      {status}
    </Badge>
  );
}

export default function DashboardBusinessesPage() {
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBusinesses() {
      try {
        const session = await getSession();
        if (!session) return;

        const supabase = createClient();
        const { data, error } = await supabase
          .from("businesses")
          .select("*")
          .eq("user_id", session.userId);
        
        if (error) throw error;

        if (data) {
          setBusinesses(data);
        }
      } catch (error) {
        console.error("Failed to fetch businesses", error);
        toast.error("Failed to load businesses");
      } finally {
        setLoading(false);
      }
    }
    fetchBusinesses();
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
            My businesses
          </h1>
          <p className="mt-2 text-[15px] font-medium text-muted-foreground">
            Manage all your registered LLCs in one place.
          </p>
        </div>
        <Button asChild className="rounded-xl">
          <Link href="/dashboard/support">
            Book consultation <ArrowUpRight className="size-4" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {loading ? (
           <div className="col-span-3 text-center py-8 text-muted-foreground">Loading businesses...</div>
        ) : businesses.length === 0 ? (
           <div className="col-span-3 text-center py-8 text-muted-foreground">No businesses found. Book a consultation to start.</div>
        ) : (
          businesses.map((b) => (
            <Card key={b.id} className="rounded-2xl">
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <CardTitle className="truncate text-[18px]">{b.business_name || "Unnamed LLC"}</CardTitle>
                    <CardDescription className="mt-2">
                      <span className="inline-flex items-center gap-2">
                        <span className="inline-flex size-8 items-center justify-center rounded-xl bg-[#EEF3FF] text-[#3960F9]">
                          <Building2 className="size-4" />
                        </span>
                        LLC
                      </span>
                    </CardDescription>
                  </div>
                  <StatusBadge status={b.status} />
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="rounded-xl border border-border bg-muted/30 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#141B34]">
                      <MapPin className="size-4 text-[#3960F9]" />
                      State
                    </div>
                    <div className="text-sm font-medium text-muted-foreground">{b.state || "Delaware"}</div>
                  </div>
                </div>
                <div className="rounded-xl border border-border bg-muted/30 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#141B34]">
                      <Calendar className="size-4 text-[#3960F9]" />
                      Formation
                    </div>
                    <div className="text-sm font-medium text-muted-foreground">{new Date(b.created_at).toLocaleDateString()}</div>
                  </div>
                </div>
                <Button variant="outline" className="w-full rounded-xl" asChild>
                  <Link href={`/dashboard/businesses/${b.id}`}>Manage business</Link>
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}



