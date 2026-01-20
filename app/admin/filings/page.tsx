"use client";

import { ArrowUpRight, FileCheck2, Shield } from "lucide-react";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

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

export default function AdminFilingsPage() {
  const [filings, setFilings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFilings() {
      const supabase = createClient();
      const { data } = await supabase
        .from("businesses")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (data) {
        setFilings(data);
      }
      setLoading(false);
    }
    fetchFilings();
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
            Filings
          </h1>
          <p className="mt-2 text-[15px] font-medium text-muted-foreground">
            Review, approve, and submit filings with clear SLAs.
          </p>
        </div>
        <Button className="rounded-xl">
          Review next <ArrowUpRight className="size-4" />
        </Button>
      </div>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Review queue</CardTitle>
          <CardDescription>Sorted by SLA and priority.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>SLA</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    Loading filings...
                  </TableCell>
                </TableRow>
              ) : filings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No filings found
                  </TableCell>
                </TableRow>
              ) : (
                filings.map((f) => (
                <TableRow key={f.id}>
                  <TableCell className="font-semibold text-[#141B34]">{f.id.slice(0, 8)}</TableCell>
                  <TableCell className="font-semibold text-[#141B34]">{f.business_name}</TableCell>
                  <TableCell className="text-sm font-medium text-muted-foreground">Formation</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-[#EEF3FF] text-[#3960F9]">
                      Normal
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm font-semibold text-[#3960F9]">48h</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" className="h-9 rounded-xl px-3">
                      Open
                    </Button>
                  </TableCell>
                </TableRow>
              )))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="rounded-2xl">
        <CardHeader className="pb-4">
          <CardTitle>Controls</CardTitle>
          <CardDescription>Standard actions for the queue.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 sm:flex-row">
          <Button variant="outline" className="rounded-xl">
            <Shield className="size-4" />
            Approve selected
          </Button>
          <Button className="rounded-xl">
            <FileCheck2 className="size-4" />
            Submit filing
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}



