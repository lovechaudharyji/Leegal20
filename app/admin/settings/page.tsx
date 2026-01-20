import { ArrowUpRight, Shield, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function AdminSettingsPage() {
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
            Settings
          </h1>
          <p className="mt-2 text-[15px] font-medium text-muted-foreground">
            Configure admin preferences and operational defaults.
          </p>
        </div>
        <Button className="rounded-xl">
          Save <ArrowUpRight className="size-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="rounded-2xl lg:col-span-2">
          <CardHeader>
            <CardTitle>Operational defaults</CardTitle>
            <CardDescription>Settings used across filings and reviews.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <div className="text-sm font-semibold text-[#141B34]">SLA (hours)</div>
                <Input className="mt-2 border-black/10 bg-white/60" defaultValue="24" />
              </div>
              <div>
                <div className="text-sm font-semibold text-[#141B34]">Review queue size</div>
                <Input className="mt-2 border-black/10 bg-white/60" defaultValue="50" />
              </div>
            </div>
            <div>
              <div className="text-sm font-semibold text-[#141B34]">Support email</div>
              <Input className="mt-2 border-black/10 bg-white/60" defaultValue="support@leegalnation.com" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Admin tools</CardTitle>
            <CardDescription>Security and preferences.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-xl border border-border bg-muted/30 p-3">
              <div className="flex items-center gap-3">
                <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[#EEF3FF] text-[#3960F9]">
                  <Shield className="size-4" />
                </span>
                <div>
                  <div className="text-sm font-semibold text-[#141B34]">Security</div>
                  <div className="text-sm font-medium text-muted-foreground">
                    Role policies and access
                  </div>
                </div>
              </div>
              <Button variant="outline" className="mt-3 w-full rounded-xl">
                Manage roles
              </Button>
            </div>
            <div className="rounded-xl border border-border bg-muted/30 p-3">
              <div className="flex items-center gap-3">
                <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[#EEF3FF] text-[#3960F9]">
                  <SlidersHorizontal className="size-4" />
                </span>
                <div>
                  <div className="text-sm font-semibold text-[#141B34]">Preferences</div>
                  <div className="text-sm font-medium text-muted-foreground">
                    Review and notification settings
                  </div>
                </div>
              </div>
              <Button className="mt-3 w-full rounded-xl">Update preferences</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}



