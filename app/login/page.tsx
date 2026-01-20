"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { signIn } from "@/lib/localAuth";
import { GoogleSignInButton } from "@/app/components/auth/GoogleSignInButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function LoginPage() {
  const router = useRouter();
  const [nextUrl, setNextUrl] = useState("/dashboard");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Avoid Next.js build-time Suspense requirement for useSearchParams by reading from window.
    const params = new URLSearchParams(window.location.search);
    setNextUrl(params.get("next") || "/dashboard");
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await signIn({ email, password });
    setLoading(false);
    if (!res.ok) {
      toast.error(res.error || "Failed to log in");
      return;
    }
    toast.success("Welcome back!");
    router.replace(nextUrl);
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-white text-zinc-950">
      {/* Landing-page style background + clouds */}
      <div className="pointer-events-none absolute inset-0 bg-[#F5F5F5] bg-[linear-gradient(180deg,rgba(244,244,245,0.35)_42.69%,rgba(57,96,249,0.35)_100%)]" />

      <div className="relative z-10 mx-auto grid min-h-screen w-full max-w-6xl grid-cols-1 gap-10 px-6 py-16 lg:grid-cols-2 lg:items-center">
        {/* Left: brand panel */}
        <div className="hidden lg:block">
          <div className="max-w-lg">
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/50 px-4 py-2 text-sm font-semibold text-[#555555] shadow-sm backdrop-blur">
              Secure access
              <span className="rounded-full bg-[#EEF3FF] px-2 py-0.5 text-xs font-semibold text-[#3960F9]">
                Dashboard
              </span>
            </div>
            <h1
              className="mt-6 text-[44px] font-semibold leading-[1.1] text-[#000000]"
              style={{
                fontFamily:
                  '"Inter Display", Inter, var(--font-sans), ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial',
              }}
            >
              Welcome back to
              <br />
              <span className="text-[#3960F9]">Leegal Nation</span>
            </h1>
            <p className="mt-4 max-w-md text-[18px] font-medium leading-[26px] text-[#555555]">
              Keep your US LLC formation, compliance, documents, and payments organized in one professional workspace.
            </p>

            <div className="mt-8 grid max-w-md grid-cols-1 gap-3">
              {[
                "Track formation & EIN progress",
                "Upload and download documents securely",
                "Stay compliant with deadlines & alerts",
              ].map((t) => (
                <div key={t} className="rounded-2xl border border-black/10 bg-white/50 p-4 shadow-sm backdrop-blur">
                  <div className="text-sm font-semibold text-[#141B34]">{t}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-sm font-medium text-[#555555]">
              Demo admin: <span className="font-semibold">admin@leegalnation.com</span> /{" "}
              <span className="font-semibold">admin123</span>
            </div>
          </div>
        </div>

        {/* Right: form */}
        <Card className="w-full rounded-2xl border border-black/10 bg-white/70 shadow-sm backdrop-blur">
          <CardHeader>
            <CardTitle className="text-[22px] text-[#141B34]">Log in</CardTitle>
            <CardDescription>Access your dashboard securely.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <GoogleSignInButton nextUrl={nextUrl} />

            <div className="relative">
              <Separator />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/10 bg-white/80 px-3 py-1 text-xs font-semibold text-[#555555]">
                or continue with email
              </div>
            </div>

            <form className="space-y-4" onSubmit={onSubmit}>
              <div>
                <div className="text-sm font-semibold text-[#141B34]">Email</div>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="mt-2 border-black/10 bg-white/60"
                  autoComplete="email"
                />
              </div>
              <div>
                <div className="text-sm font-semibold text-[#141B34]">Password</div>
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  type="password"
                  className="mt-2 border-black/10 bg-white/60"
                  autoComplete="current-password"
                />
              </div>

              <Button className="w-full rounded-xl" disabled={loading}>
                {loading ? "Logging in..." : "Log in"}
              </Button>
            </form>

            <div className="text-center text-sm font-medium text-[#555555]">
              Don’t have an account?{" "}
              <Link className="font-semibold text-[#3960F9]" href="/signup">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


