"use client";

import { useEffect, useState } from "react";
import { Download, Landmark, Link as LinkIcon, Receipt, ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const BANKING = {
  bankName: "Mercury",
  accountStatus: "In review",
  providers: [
    { name: "Stripe", status: "Not started" },
    { name: "Mercury", status: "In review" },
    { name: "Wise", status: "Connected" },
  ],
} as const;

const INVOICES = [
  { id: "INV-1007", title: "LLC Formation (State filing)", amount: "$299", status: "Paid", date: "Jan 12, 2026" },
  { id: "INV-1008", title: "EIN Service", amount: "$79", status: "Pending", date: "Jan 13, 2026" },
  { id: "INV-1009", title: "Registered Agent (Annual)", amount: "$99", status: "Pending", date: "Jan 15, 2026" },
] as const;

function StatusBadge({ status }: { status: string }) {
  const cls =
    status === "Paid" || status === "Connected"
      ? "bg-[#EEF3FF] text-[#3960F9]"
      : "bg-[#F5F5F5] text-[#555555]";
  return (
    <Badge variant="secondary" className={cls}>
      {status}
    </Badge>
  );
}

export default function DashboardBankingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1
          className="text-[28px] font-semibold leading-[1.15] text-[#141B34] sm:text-[32px]"
          style={{
            fontFamily:
              '"Inter Display", Inter, var(--font-sans), ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial',
          }}
        >
          Banking & Payments
        </h1>
        <p className="mt-2 text-[15px] font-medium text-muted-foreground">
          Track banking setup, provider connections, and invoices in one place.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Banking section */}
        <Card className="rounded-2xl lg:col-span-2">
          <CardHeader>
            <CardTitle>Banking</CardTitle>
            <CardDescription>Business banking and provider setup status.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-muted/30 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-[#141B34]">Bank name</div>
                  <div className="mt-2 text-[18px] font-semibold text-[#3960F9]">
                    {BANKING.bankName}
                  </div>
                </div>
                <div className="inline-flex size-9 items-center justify-center rounded-xl bg-[#EEF3FF] text-[#3960F9]">
                  <Landmark className="size-4" />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-muted/30 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-[#141B34]">Account status</div>
                  <div className="mt-2">
                    <StatusBadge status={BANKING.accountStatus} />
                  </div>
                </div>
                <div className="inline-flex size-9 items-center justify-center rounded-xl bg-[#EEF3FF] text-[#3960F9]">
                  <ShieldCheck className="size-4" />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-white/60 p-4 shadow-sm md:col-span-2">
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-semibold text-[#141B34]">Provider setup</div>
                <Badge variant="secondary" className="bg-[#EEF3FF] text-[#3960F9]">
                  {BANKING.providers.filter((p) => p.status === "Connected").length}/
                  {BANKING.providers.length} connected
                </Badge>
              </div>
              <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
                {BANKING.providers.map((p) => (
                  <div
                    key={p.name}
                    className="rounded-xl border border-border bg-muted/30 px-3 py-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-sm font-semibold text-[#141B34]">{p.name}</div>
                      <StatusBadge status={p.status} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <Button className="rounded-xl">
                  Connect provider <LinkIcon className="size-4" />
                </Button>
                <Button variant="outline" className="rounded-xl">
                  View checklist
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payments section */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Payments</CardTitle>
            <CardDescription>Invoices and payment status.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-2xl border border-border bg-white/60 p-4 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-[#141B34]">Outstanding</div>
                  <div className="mt-2 text-[18px] font-semibold text-[#3960F9]">
                    {INVOICES.filter((i) => i.status === "Pending").length} invoices
                  </div>
                  <div className="mt-2 text-sm font-medium text-muted-foreground">
                    Pay pending invoices to keep setup moving.
                  </div>
                </div>
                <div className="inline-flex size-9 items-center justify-center rounded-xl bg-[#EEF3FF] text-[#3960F9]">
                  <Receipt className="size-4" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Invoice list</CardTitle>
          <CardDescription>Download invoices or pay pending ones.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {INVOICES.map((inv) => (
                <TableRow key={inv.id}>
                  <TableCell className="font-semibold text-[#141B34]">{inv.id}</TableCell>
                  <TableCell className="text-sm font-medium text-muted-foreground">
                    <div className="font-semibold text-[#141B34]">{inv.title}</div>
                    <div className="text-sm font-medium text-muted-foreground">{inv.date}</div>
                  </TableCell>
                  <TableCell className="text-sm font-semibold text-[#141B34]">{inv.amount}</TableCell>
                  <TableCell>
                    <StatusBadge status={inv.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="inline-flex items-center gap-2">
                      <Button asChild variant="outline" className="h-9 rounded-xl px-3">
                        <a href="/file.svg" download>
                          <Download className="mr-2 size-4" />
                          Download
                        </a>
                      </Button>
                      {inv.status === "Pending" ? (
                        <Button className="h-9 rounded-xl px-3">Pay now</Button>
                      ) : (
                        <Button variant="outline" className="h-9 rounded-xl px-3" disabled>
                          Paid
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}



