"use client";

import { useEffect, useState } from "react";
import { Camera, FileCheck2, Globe, Mail, Phone, Upload, User } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getSession } from "@/lib/localAuth";
import { createClient } from "@/lib/supabase/client";

type KycStatus = "Verified" | "Pending" | "Rejected";

const KYC_DOCS: readonly {
  title: string;
  description: string;
  status: KycStatus;
}[] = [
  {
    title: "Passport",
    description: "Government-issued passport (photo page).",
    status: "Pending",
  },
  {
    title: "Address Proof",
    description: "Utility bill or bank statement (last 90 days).",
    status: "Verified",
  },
] as const;

function KycBadge({ status }: { status: KycStatus }) {
  if (status === "Verified") {
    return (
      <Badge variant="secondary" className="bg-[#EEF3FF] text-[#3960F9]">
        Verified
      </Badge>
    );
  }
  if (status === "Rejected") {
    return (
      <Badge variant="secondary" className="bg-[#F5F5F5] text-[#555555]">
        Rejected
      </Badge>
    );
  }
  return (
    <Badge variant="secondary" className="bg-[#F5F5F5] text-[#555555]">
      Pending
    </Badge>
  );
}

export default function DashboardProfilePage() {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const session = await getSession();
      if (session) {
         // Initial load from session
         setUser(prev => ({
             ...prev,
             fullName: session.fullName || "",
             email: session.email || "",
         }));
         
         // Fetch full details from DB
         const supabase = createClient();
         const { data } = await supabase.from('users').select('*').eq('id', session.userId).single();
         if (data) {
             setUser({
                 fullName: data.full_name || "",
                 email: data.email || "",
                 phone: data.phone || "",
                 country: data.country || ""
             });
         }
      }
      setLoading(false);
    }
    load();
  }, []);

  async function handleSave() {
      const session = await getSession();
      if (!session) return;
      
      const supabase = createClient();
      const { error } = await supabase.from('users').update({
          full_name: user.fullName,
          phone: user.phone,
          country: user.country
      }).eq('id', session.userId);
      
      if (!error) {
          // Ideally show a toast here
          // For now just console log
          console.log("Profile updated");
      }
  }

  if (loading) {
      return <div className="p-6">Loading profile...</div>;
  }

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
          Profile & KYC
        </h1>
        <p className="mt-2 text-[15px] font-medium text-muted-foreground">
          Manage your personal details and upload KYC documents for verification.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="rounded-2xl lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
                <div>
                    <CardTitle>User details</CardTitle>
                    <CardDescription>Keep your account information accurate.</CardDescription>
                </div>
                <Button onClick={handleSave} size="sm">Save Changes</Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#141B34]">
                  <User className="size-4 text-[#3960F9]" />
                  Full name
                </div>
                <Input
                  className="mt-2 border-black/10 bg-white/60"
                  value={user.fullName}
                  onChange={(e) => setUser({...user, fullName: e.target.value})}
                />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#141B34]">
                  <Mail className="size-4 text-[#3960F9]" />
                  Email
                </div>
                <Input 
                    className="mt-2 border-black/10 bg-white/60" 
                    value={user.email} 
                    disabled 
                />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#141B34]">
                  <Phone className="size-4 text-[#3960F9]" />
                  Phone number
                </div>
                <Input 
                    className="mt-2 border-black/10 bg-white/60" 
                    value={user.phone}
                    onChange={(e) => setUser({...user, phone: e.target.value})}
                    placeholder="+1 (555) 000-0000"
                />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#141B34]">
                  <Globe className="size-4 text-[#3960F9]" />
                  Country of residence
                </div>
                <Input 
                    className="mt-2 border-black/10 bg-white/60" 
                    value={user.country}
                    onChange={(e) => setUser({...user, country: e.target.value})}
                    placeholder="United States"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* KYC Documents */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>KYC Documents</CardTitle>
            <CardDescription>Required for banking & compliance.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {KYC_DOCS.map((doc) => (
              <div
                key={doc.title}
                className="flex items-start justify-between gap-3 rounded-xl border border-border bg-muted/30 p-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-semibold text-[#141B34]">{doc.title}</div>
                    <KycBadge status={doc.status} />
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">{doc.description}</div>
                </div>
                {doc.status !== "Verified" && (
                  <Button variant="ghost" size="icon" className="size-8 shrink-0">
                    <Upload className="size-4 text-[#3960F9]" />
                  </Button>
                )}
                {doc.status === "Verified" && (
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#EEF3FF]">
                    <FileCheck2 className="size-4 text-[#3960F9]" />
                  </div>
                )}
              </div>
            ))}
            <Button className="w-full rounded-xl" variant="outline">
              <Camera className="mr-2 size-4" />
              Start Verification
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
