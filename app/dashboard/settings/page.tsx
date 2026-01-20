"use client";

import { ArrowUpRight, Lock, User } from "lucide-react";
import { useEffect, useState } from "react";
import { getSession } from "@/lib/localAuth";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function DashboardSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    async function load() {
      const session = await getSession();
      if (session) {
        setFullName(session.fullName);
        setEmail(session.email);
        setUserId(session.userId);
      }
      setLoading(false);
    }
    load();
  }, []);

  async function handleSave() {
     setSaving(true);
     try {
       const supabase = createClient();
       // Update metadata
       const { error: authError } = await supabase.auth.updateUser({ data: { full_name: fullName } });
       if (authError) throw authError;

       // Update public table
       const { error: dbError } = await supabase.from('users').update({ full_name: fullName }).eq('id', userId);
       if (dbError) throw dbError;

       toast.success("Settings saved successfully");
     } catch (error: any) {
       console.error("Failed to save settings", error);
       toast.error(error.message || "Failed to save settings");
     } finally {
       setSaving(false);
     }
  }

  if (loading) {
    return <div className="p-8 text-center text-muted-foreground">Loading settings...</div>;
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
            Settings
          </h1>
          <p className="mt-2 text-[15px] font-medium text-muted-foreground">
            Manage your profile, security, and preferences.
          </p>
        </div>
        <Button className="rounded-xl" onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save changes"} <ArrowUpRight className="size-4 ml-2" />
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="rounded-2xl lg:col-span-2">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Update your personal details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <div className="text-sm font-semibold text-[#141B34]">Full name</div>
                <Input 
                  className="mt-2 border-black/10 bg-white/60" 
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                />
              </div>
              <div>
                <div className="text-sm font-semibold text-[#141B34]">Email</div>
                <Input 
                  className="mt-2 border-black/10 bg-white/60" 
                  value={email}
                  disabled
                />
              </div>
            </div>
            <div>
              <div className="text-sm font-semibold text-[#141B34]">Company</div>
              <Input className="mt-2 border-black/10 bg-white/60" defaultValue="Leegal Nation LLC" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Security</CardTitle>
            <CardDescription>Keep your account protected.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-xl border border-border bg-muted/30 p-3">
              <div className="flex items-center gap-3">
                <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[#EEF3FF] text-[#3960F9]">
                  <Lock className="size-4" />
                </span>
                <div>
                  <div className="text-sm font-semibold text-[#141B34]">Password</div>
                  <div className="text-sm font-medium text-muted-foreground">
                    Last changed 30 days ago
                  </div>
                </div>
              </div>
              <Button variant="outline" className="mt-3 w-full rounded-xl">
                Change password
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-muted/30 p-3">
              <div className="flex items-center gap-3">
                <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[#EEF3FF] text-[#3960F9]">
                  <User className="size-4" />
                </span>
                <div>
                  <div className="text-sm font-semibold text-[#141B34]">2FA</div>
                  <div className="text-sm font-medium text-muted-foreground">
                    Not enabled
                  </div>
                </div>
              </div>
              <Button className="mt-3 w-full rounded-xl">Enable 2FA</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}



