"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Globe, Lock, Mail, Phone, User } from "lucide-react";
import ReactCountryFlag from "react-country-flag";
import { toast } from "sonner";

import { signUp, Plan } from "@/lib/localAuth";
import { GoogleSignInButton } from "@/app/components/auth/GoogleSignInButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { COUNTRIES, DEFAULT_COUNTRY_CODE } from "./countries";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const TOP_CLOUDS = [
  {
    key: "cloud-a",
    className:
      "right-[-120px] top-[140px] h-[147.866px] w-[256.338px] bg-[url('/cloud-020-a.png')] opacity-[0.45] blur-[0.6px]",
  },
  {
    key: "cloud-b",
    className:
      "left-[-180px] top-[520px] h-[147.866px] w-[467.069px] bg-[url('/cloud-020-b.png')] opacity-[0.35] blur-[0.8px]",
  },
  {
    key: "cloud-c",
    className:
      "left-[140px] top-[60px] h-[147.866px] w-[467.069px] bg-[url('/cloud-020-c.png')] opacity-[0.4] blur-[0.7px]",
  },
] as const;

function SignupContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState(DEFAULT_COUNTRY_CODE);
  const [dialCode, setDialCode] = useState("+1");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const selectedCountry = useMemo(() => {
    return COUNTRIES.find((c) => c.code === countryCode) ?? COUNTRIES[0];
  }, [countryCode]);

  // Always keep dial code in sync with selected country.
  useEffect(() => {
    const found = COUNTRIES.find((c) => c.code === countryCode);
    if (found && found.dial && found.dial !== dialCode) setDialCode(found.dial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryCode]);

  const uniqueDialCodes = useMemo(() => {
    return Array.from(new Map(COUNTRIES.map((c) => [c.dial, c.dial])).values()).sort((a, b) =>
      a.localeCompare(b),
    );
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const phone = phoneNumber.trim()
      ? `${dialCode} ${phoneNumber.trim()}`
      : "";
    const country = selectedCountry?.name ?? "";
    const plan = (searchParams.get("plan") as Plan) || "free";
    const res = await signUp({ fullName, email, phone, country, password, plan });
    setLoading(false);
    
    if (!res.ok) {
      toast.error(res.error || "Failed to create account");
      return;
    }

    if (!res.session) {
      toast.success(res.message || "Account created! Please check your email to confirm.");
      router.replace("/login");
      return;
    }

    toast.success("Account created successfully!");
    router.replace("/dashboard");
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-white text-zinc-950">
      <div className="pointer-events-none absolute inset-0 bg-[#F5F5F5] bg-[linear-gradient(180deg,rgba(244,244,245,0.35)_42.69%,rgba(57,96,249,0.35)_100%)]" />
      {/* Clouds (same style as landing page) */}
      {TOP_CLOUDS.map((c) => (
        <div
          key={c.key}
          aria-hidden="true"
          className={[
            "pointer-events-none absolute z-0",
            "bg-cover bg-center mix-blend-screen",
            c.className,
          ].join(" ")}
        />
      ))}

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-5xl items-center justify-center px-4 py-3 sm:px-6 sm:py-5 xl:max-w-6xl [@media(max-height:760px)]:py-2">
        <div className="w-full overflow-hidden rounded-[22px] border border-black/10 bg-white/70 shadow-sm backdrop-blur">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left: reserved photo space */}
            <div className="relative hidden lg:block">
              <div
                className={[
                  "absolute inset-0 bg-cover bg-center",
                  // Replace this with your real photo: put an image at /public/auth-signup.jpg
                  "bg-[url('/auth-signup2.jpg')]",
                ].join(" ")}
              />
              {/* Fallback gradient overlay so it still looks good without a photo */}
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(57,96,249,0.35)_0%,rgba(0,0,0,0.10)_55%,rgba(244,244,245,0.45)_100%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_40%,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0.0)_70%)]" />

              <div className="absolute bottom-5 left-5 right-5 [@media(max-height:760px)]:hidden">
                <div className="rounded-2xl border border-black/10 bg-white/75 p-4 text-[#141B34] shadow-sm backdrop-blur">
                  <div className="text-sm font-semibold text-[#141B34]">Leegal Nation</div>
                  <div className="mt-2 text-[20px] font-semibold leading-[1.2] text-[#000000]">
                    A professional workspace for your US LLC journey.
                  </div>
                  <div className="mt-2 text-sm font-medium text-[#555555]">
                    Formation, EIN, banking, compliance, and documents — in one place.
                  </div>
                </div>
              </div>
            </div>

            {/* Right: form */}
            <div className="p-4 sm:p-6 lg:p-6 [@media(max-height:760px)]:p-4">
              <div className="mx-auto w-full max-w-[480px]">
                <div className="flex items-center justify-center">
                  <div className="flex size-9 items-center justify-center rounded-full bg-[#2F6BFF] [@media(max-height:760px)]:size-8">
                    <LogoMark />
                  </div>
                </div>

                <h1
                  className="mt-3 text-center text-[24px] font-semibold leading-tight text-[#141B34] sm:mt-4 sm:text-[26px] [@media(max-height:760px)]:mt-2 [@media(max-height:760px)]:text-[22px]"
                  style={{
                    fontFamily:
                      '"Inter Display", Inter, var(--font-sans), ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial',
                  }}
                >
                  Create an account
                </h1>

                <p className="mt-2 text-center text-[13px] font-medium leading-snug text-[#555555] sm:text-sm [@media(max-height:760px)]:mt-1 [@media(max-height:760px)]:text-[12px]">
                  Create your workspace and access the dashboard.
                </p>

                <div className="mt-4 sm:mt-6 [@media(max-height:760px)]:mt-3">
                  <GoogleSignInButton
                    nextUrl="/dashboard"
                    className={[
                      // shrink the internal outline button (works without changing the component)
                      "[&>button]:h-9 [&>button]:text-sm [&>button_svg]:h-4 [&>button_svg]:w-4",
                      "sm:[&>button]:h-10",
                      "[@media(max-height:760px)]:[&>button]:h-8",
                    ].join(" ")}
                  />
                </div>

                <div className="relative mt-4 sm:mt-6 [@media(max-height:760px)]:mt-3">
                  <Separator />
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/10 bg-white/90 px-3 py-1 text-xs font-semibold text-[#555555]">
                    Or
                  </div>
                </div>

                <form className="mt-4 space-y-2.5 sm:mt-6 sm:space-y-3 [@media(max-height:760px)]:mt-3 [@media(max-height:760px)]:space-y-2" onSubmit={onSubmit}>
                  <div>
                    <div className="text-xs font-semibold text-[#141B34] sm:text-sm">Email</div>
                    <div className="relative mt-1.5 sm:mt-2">
                      <Mail className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-[#555555] sm:size-4" />
                      <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="h-8 border-black/10 bg-white/60 pl-10 text-sm sm:h-9 [@media(max-height:760px)]:h-7"
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="text-xs font-semibold text-[#141B34] sm:text-sm">Full name</div>
                    <div className="relative mt-1.5 sm:mt-2">
                      <User className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-[#555555] sm:size-4" />
                      <Input
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Enter your full name"
                        className="h-8 border-black/10 bg-white/60 pl-10 text-sm sm:h-9 [@media(max-height:760px)]:h-7"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                    <div>
                      <div className="text-xs font-semibold text-[#141B34] sm:text-sm">Phone</div>
                      <div className="mt-1.5 sm:mt-2">
                        <div className="flex h-8 w-full items-center overflow-hidden rounded-xl border border-black/10 bg-white/60 shadow-sm focus-within:ring-2 focus-within:ring-[#3960F9]/30 sm:h-9 [@media(max-height:760px)]:h-7">
                          <div className="min-w-[84px] border-r border-black/10">
                            <Select value={dialCode} onValueChange={setDialCode}>
                              <SelectTrigger className="h-8 border-0 bg-transparent px-3 text-sm shadow-none focus-visible:ring-0 sm:h-9 [@media(max-height:760px)]:h-7">
                                <SelectValue placeholder="+1" />
                              </SelectTrigger>
                              <SelectContent>
                                {uniqueDialCodes.map((d) => (
                                  <SelectItem key={d} value={d}>
                                    {d}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="relative flex min-w-0 flex-1 items-center">
                            <Phone className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-[#555555] sm:size-4" />
                            <input
                              value={phoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value)}
                              placeholder="Phone number"
                              className="h-8 w-full bg-transparent pl-10 pr-3 text-sm font-medium text-[#141B34] placeholder:text-[#555555] focus:outline-none sm:h-9 [@media(max-height:760px)]:h-7"
                              autoComplete="tel-national"
                              inputMode="tel"
                            />
                          </div>
                        </div>

                        {phoneNumber.trim() ? (
                          <div className="mt-1 text-xs font-medium text-[#555555]">
                            Full number:{" "}
                            <span className="font-semibold text-[#141B34]">
                              {dialCode} {phoneNumber.trim()}
                            </span>
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#141B34] sm:text-sm">Country</div>
                      <div className="relative mt-1.5 sm:mt-2">
                        <Globe className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-[#555555] sm:size-4" />
                        <Select
                          value={countryCode}
                          onValueChange={(code) => {
                            setCountryCode(code);
                            const found = COUNTRIES.find((c) => c.code === code);
                            if (found) setDialCode(found.dial);
                          }}
                        >
                          <SelectTrigger className="h-8 pl-10 text-sm sm:h-9 [@media(max-height:760px)]:h-7">
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent>
                            {COUNTRIES.map((c) => (
                              <SelectItem key={c.code} value={c.code}>
                                <span className="flex items-center gap-2">
                                  <ReactCountryFlag
                                    countryCode={c.code}
                                    svg
                                    aria-label={c.name}
                                    style={{ width: "1.15em", height: "1.15em" }}
                                    className="rounded-[2px] shadow-[0_0_0_1px_rgba(0,0,0,0.08)]"
                                  />
                                  <span className="truncate">{c.name}</span>
                                </span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs font-semibold text-[#141B34] sm:text-sm">Password</div>
                    <div className="relative mt-1.5 sm:mt-2">
                      <Lock className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-[#555555] sm:size-4" />
                      <Input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Create your password"
                        type="password"
                        className="h-8 border-black/10 bg-white/60 pl-10 text-sm sm:h-9 [@media(max-height:760px)]:h-7"
                        autoComplete="new-password"
                      />
                    </div>
                  </div>

                  <Button
                    className="h-9 w-full rounded-xl text-sm sm:h-10 [@media(max-height:760px)]:h-8"
                    disabled={loading}
                    style={{
                      background:
                        "radial-gradient(27.92% 100% at 50% 0%, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.00) 100%), #3960F9",
                      boxShadow:
                        "0 -1px 0 0 rgba(0, 0, 0, 0.16) inset, 0 1px 0 0 rgba(255, 255, 255, 0.16) inset",
                    }}
                  >
                    {loading ? (
                      "Creating account..."
                    ) : (
                      <>
                        Create an account <ArrowUpRight className="size-4" />
                      </>
                    )}
                  </Button>
                </form>

                <div className="mt-4 text-center text-sm font-medium text-[#555555] sm:mt-6">
                  Already have an account?{" "}
                  <Link className="font-semibold text-[#3960F9]" href="/login">
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignupContent />
    </Suspense>
  );
}

function LogoMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-5">
      <path
        d="M12 5.5c4 0 7 3.2 7 7.15 0 3.95-3 6.85-7 6.85s-7-2.9-7-6.85C5 8.7 8 5.5 12 5.5Z"
        fill="white"
        opacity="0.95"
      />
      <path
        d="M9 13.2c.7 1.2 2 2 3.5 2s2.8-.8 3.5-2"
        stroke="#2F6BFF"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="9.5" cy="10.6" r="1" fill="#2F6BFF" />
      <circle cx="14.5" cy="10.6" r="1" fill="#2F6BFF" />
    </svg>
  );
}


