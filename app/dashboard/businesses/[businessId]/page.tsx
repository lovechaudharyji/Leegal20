"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  BadgeCheck,
  Building2,
  Calendar,
  Hash,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";

function statusBadgeClass(status: string) {
  return status === "Approved" ? "bg-[#EEF3FF] text-[#3960F9]" : "bg-[#F5F5F5] text-[#555555]";
}

function maskId(value: string, keepLast = 4) {
  if (!value) return "•".repeat(keepLast + 2);
  const digits = value.replace(/\D/g, "");
  if (digits.length <= keepLast) return value;
  const maskedDigits = `${"•".repeat(Math.max(0, digits.length - keepLast))}${digits.slice(-keepLast)}`;
  let di = 0;
  return value.replace(/\d/g, () => maskedDigits[di++] ?? "•");
}

export default function BusinessDetailsPage() {
  const params = useParams();
  const businessId = params.businessId as string;
  const [business, setBusiness] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBusiness() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("businesses")
          .select("*")
          .eq("id", businessId)
          .single();
        
        if (error) throw error;
        
        if (data) {
          setBusiness({
            id: data.id,
            name: data.business_name,
            state: data.state || "Delaware",
            formationDate: new Date(data.created_at).toLocaleDateString(),
            status: data.status,
            compliance: "Good", // Placeholder
            registeredAgent: "Standard Agent Service", // Placeholder
            businessAddress: "123 Business Rd", // Placeholder
            governmentIds: {
              ein: "Pending",
              stateFileNumber: "Pending",
            },
            servicesTaken: {
              llcFormation: true,
              einService: true,
              bankAccount: false,
              itin: false,
              trademark: false,
            },
          });
        }
      } catch (err) {
        console.error("Error fetching business:", err);
        toast.error("Failed to load business details");
      } finally {
        setLoading(false);
      }
    }
    if (businessId) {
      fetchBusiness();
    }
  }, [businessId]);

  if (loading) {
    return <div className="p-8 text-center text-muted-foreground">Loading business details...</div>;
  }

  if (!business) {
    return (
        <div className="space-y-6">
            <Button asChild variant="outline" className="rounded-xl">
                <Link href="/dashboard/businesses">
                    <ArrowLeft className="size-4" />
                    Back
                </Link>
            </Button>
            <div className="p-8 text-center text-muted-foreground">Business not found</div>
        </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <Button asChild variant="outline" className="rounded-xl">
          <Link href="/dashboard/businesses">
            <ArrowLeft className="size-4" />
            Back
          </Link>
        </Button>
        <Badge variant="secondary" className={statusBadgeClass(business.status)}>
          {business.status}
        </Badge>
      </div>

      <div>
        <h1
          className="text-[28px] font-semibold leading-[1.15] text-[#141B34] sm:text-[32px]"
          style={{
            fontFamily:
              '"Inter Display", Inter, var(--font-sans), ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial',
          }}
        >
          {business.name}
        </h1>
        <p className="mt-2 text-[15px] font-medium text-muted-foreground">
          Details for this business and current compliance overview.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="rounded-2xl lg:col-span-2">
          <CardHeader>
            <CardTitle>Company information</CardTitle>
            <CardDescription>Core company details for your LLC.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-muted/30 p-4">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#141B34]">
                <MapPin className="size-4 text-[#3960F9]" /> State
              </div>
              <div className="mt-2 text-sm font-medium text-muted-foreground">{business.state}</div>
            </div>
            <div className="rounded-xl border border-border bg-muted/30 p-4">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#141B34]">
                <Calendar className="size-4 text-[#3960F9]" /> Formation date
              </div>
              <div className="mt-2 text-sm font-medium text-muted-foreground">
                {business.formationDate}
              </div>
            </div>
            <div className="rounded-xl border border-border bg-muted/30 p-4">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#141B34]">
                <Building2 className="size-4 text-[#3960F9]" /> Entity
              </div>
              <div className="mt-2 text-sm font-medium text-muted-foreground">LLC</div>
            </div>
            <div className="rounded-xl border border-border bg-muted/30 p-4">
              <div className="text-sm font-semibold text-[#141B34]">Registered Agent</div>
              <div className="mt-2 text-sm font-medium text-muted-foreground">
                {business.registeredAgent}
              </div>
            </div>
            <div className="rounded-xl border border-border bg-muted/30 p-4 md:col-span-2">
              <div className="text-sm font-semibold text-[#141B34]">Business Address</div>
              <div className="mt-2 text-sm font-medium text-muted-foreground">
                {business.businessAddress}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Compliance</CardTitle>
            <CardDescription>Current status and next action.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-xl border border-border bg-muted/30 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-[#141B34]">Status</div>
                  <div className="mt-1 text-sm font-medium text-muted-foreground">
                    {business.compliance}
                  </div>
                </div>
                <div className="inline-flex size-9 items-center justify-center rounded-xl bg-[#EEF3FF] text-[#3960F9]">
                  {business.compliance === "Good" ? (
                    <BadgeCheck className="size-4" />
                  ) : (
                    <ShieldCheck className="size-4" />
                  )}
                </div>
              </div>
            </div>
            <Button asChild className="w-full rounded-xl">
              <Link href="/dashboard/support">Get help</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="rounded-2xl lg:col-span-2">
          <CardHeader>
            <CardTitle>Government IDs</CardTitle>
            <CardDescription>Shown partially for security.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-muted/30 p-4">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#141B34]">
                <Hash className="size-4 text-[#3960F9]" /> EIN number
              </div>
              <div className="mt-2 font-mono text-sm font-semibold text-[#141B34]">
                {maskId(business.governmentIds.ein)}
              </div>
            </div>
            <div className="rounded-xl border border-border bg-muted/30 p-4">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#141B34]">
                <Hash className="size-4 text-[#3960F9]" /> State file number
              </div>
              <div className="mt-2 font-mono text-sm font-semibold text-[#141B34]">
                {maskId(business.governmentIds.stateFileNumber, 3)}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Services taken</CardTitle>
            <CardDescription>What’s included in your setup.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              { label: "LLC Formation", ok: business.servicesTaken.llcFormation },
              { label: "EIN Service", ok: business.servicesTaken.einService },
              { label: "Bank Account", ok: business.servicesTaken.bankAccount },
              { label: "ITIN (if applicable)", ok: business.servicesTaken.itin },
              { label: "Trademark (if applicable)", ok: business.servicesTaken.trademark },
            ].map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between gap-3 rounded-xl border border-border bg-muted/30 px-3 py-2"
              >
                <div className="text-sm font-semibold text-[#141B34]">{row.label}</div>
                <Badge
                  variant="secondary"
                  className={row.ok ? "bg-[#EEF3FF] text-[#3960F9]" : "bg-[#F5F5F5] text-[#555555]"}
                >
                  {row.ok ? "Included" : "Not added"}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


