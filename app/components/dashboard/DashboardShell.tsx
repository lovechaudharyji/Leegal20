"use client";

import Link from "next/link";
import { type ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  Bell,
  BookOpen,
  BriefcaseBusiness,
  CreditCard,
  ClipboardCheck,
  FileText,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Settings,
  Shield,
  Users,
  UserRound,
  CheckCircle2,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, getSession, upgradeUser } from "@/lib/localAuth";
import { PremiumLock } from "@/components/ui/premium-lock";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

type NavItem = {
  label: string;
  href: string;
  icon: ReactNode;
};

type DashboardShellProps = {
  variant: "user" | "admin";
  children: ReactNode;
};

export function DashboardShell({ variant, children }: DashboardShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  
  const [isPremium, setIsPremium] = useState(false);
  const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);
  const [upgrading, setUpgrading] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    getSession().then((session) => {
      setIsPremium(session?.plan === "premium");
      if (session) setUserId(session.userId);
    });
  }, []);

  async function handleUpgrade() {
    if (!userId) return;
    setUpgrading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await upgradeUser(userId);
      setIsPremium(true);
      toast.success("Successfully upgraded to Premium!");
      setIsUpgradeOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Upgrade failed", error);
      toast.error("Upgrade failed. Please try again.");
    } finally {
      setUpgrading(false);
    }
  }

  const nav: NavItem[] =
    variant === "admin"
      ? [
          { label: "Overview", href: "/admin", icon: <LayoutDashboard className="size-4" /> },
          { label: "Users", href: "/admin/users", icon: <Users className="size-4" /> },
          { label: "Filings", href: "/admin/filings", icon: <Shield className="size-4" /> },
          { label: "Analytics", href: "/admin/analytics", icon: <BarChart3 className="size-4" /> },
          { label: "Settings", href: "/admin/settings", icon: <Settings className="size-4" /> },
        ]
      : [
          // ✅ User dashboard navigation (requested order)
          { label: "Dashboard", href: "/dashboard", icon: <LayoutDashboard className="size-4" /> },
          { label: "My Businesses", href: "/dashboard/businesses", icon: <BriefcaseBusiness className="size-4" /> },
          { label: "Documents", href: "/dashboard/documents", icon: <FileText className="size-4" /> },
          { label: "Compliance", href: "/dashboard/compliance", icon: <ClipboardCheck className="size-4" /> },
          { label: "Banking & Payments", href: "/dashboard/banking", icon: <CreditCard className="size-4" /> },
          { label: "Support", href: "/dashboard/support", icon: <HelpCircle className="size-4" /> },
          { label: "Resources", href: "/dashboard/guides", icon: <BookOpen className="size-4" /> },
          { label: "Profile & KYC", href: "/dashboard/profile", icon: <UserRound className="size-4" /> },
          { label: "Logout", href: "/login", icon: <LogOut className="size-4" /> },
        ];

  return (
    <div
      className="relative min-h-screen overflow-x-hidden bg-white text-zinc-950"
      style={{
        fontFamily:
          '"Inter Display", Inter, var(--font-sans), ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial',
        // Force landing-page light palette inside dashboards (prevents OS dark mode from turning it black)
        ["--background" as any]: "#ffffff",
        ["--foreground" as any]: "#171717",
        ["--card" as any]: "#ffffff",
        ["--card-foreground" as any]: "#171717",
        ["--popover" as any]: "#ffffff",
        ["--popover-foreground" as any]: "#171717",
        ["--primary" as any]: "#3960f9",
        ["--primary-foreground" as any]: "#ffffff",
        ["--secondary" as any]: "#f4f4f5",
        ["--secondary-foreground" as any]: "#000000",
        ["--muted" as any]: "#f4f4f5",
        ["--muted-foreground" as any]: "#555555",
        ["--accent" as any]: "#eef3ff",
        ["--accent-foreground" as any]: "#141b34",
        ["--border" as any]: "#e6e6e6",
        ["--input" as any]: "#e6e6e6",
        ["--ring" as any]: "#3960f9",
      }}
    >


      <div className="relative z-10 flex w-full gap-6 px-6 py-6">
        {/* Sidebar */}
        <aside className="fixed left-6 top-6 z-30 hidden w-[260px] max-h-[calc(100vh-3rem)] overflow-y-auto no-scrollbar lg:block">
          <div className="rounded-2xl border border-black/10 bg-white/60 p-4 shadow-sm backdrop-blur">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-[#2F6BFF] text-white">
                  ⌁
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#141B34]">
                    Leegal Nation
                  </div>
                  <div className="text-xs font-medium text-[#555555]">
                    {variant === "admin" ? "Admin Console" : "Client Dashboard"}
                  </div>
                </div>
              </div>
              {variant === "admin" ? (
                <Badge variant="secondary" className="bg-[#EEF3FF] text-[#3960F9]">
                  Admin
                </Badge>
              ) : isPremium ? (
                <Badge
                  variant="secondary"
                  className="bg-[#EEF3FF] text-[#3960F9] border-[#3960F9]/20"
                >
                  Premium
                </Badge>
              ) : (
                <Dialog open={isUpgradeOpen} onOpenChange={setIsUpgradeOpen}>
                  <DialogTrigger asChild>
                    <Badge
                      variant="secondary"
                      className="cursor-pointer text-white border-white/20 hover:opacity-90 transition-opacity"
                      style={{
                        background:
                          "radial-gradient(27.92% 100% at 50% 0%, rgba(255, 255, 255, 0.24) 0%, rgba(255, 255, 255, 0.00) 100%), #3960F9",
                        boxShadow:
                          "0 1px 2px -1px rgba(9, 6, 63, 0.40), 0 1px 0 0 rgba(255, 255, 255, 0.16) inset, 0 0 0 1px #3960F9",
                      }}
                    >
                      Free
                    </Badge>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] bg-white border-black/5 shadow-2xl">
                    <DialogHeader>
                      <DialogTitle className="text-[#141B34] font-semibold text-xl">Upgrade to Premium</DialogTitle>
                      <DialogDescription className="text-[#555555]">
                        Unlock full access to Leegal Nation's powerful business tools.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 border p-4 rounded-lg bg-[#EEF3FF] border-[#3960F9]/20">
                          <div className="flex-1">
                            <h4 className="font-semibold text-[#141B34]">Premium Plan</h4>
                            <p className="text-sm text-[#3960F9] font-medium">$299 / one-time</p>
                          </div>
                          <div className="bg-white text-[#3960F9] text-xs px-2 py-1 rounded-full font-bold border border-[#3960F9]/20 shadow-sm">
                            BEST VALUE
                          </div>
                        </div>
                        <ul className="text-sm space-y-3 text-[#555555]">
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-[#3960F9]" />
                            Unlimited Document Storage
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-[#3960F9]" />
                            Priority Legal Support
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-[#3960F9]" />
                            Annual Compliance Calendar
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-[#3960F9]" />
                            Registered Agent Service
                          </li>
                        </ul>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsUpgradeOpen(false)} className="border-black/10 text-[#555555] hover:bg-black/5">
                        Cancel
                      </Button>
                      <Button 
                        onClick={handleUpgrade}
                        disabled={upgrading}
                        className="text-white border-0 font-semibold"
                        style={{
                          background:
                            "radial-gradient(27.92% 100% at 50% 0%, rgba(255, 255, 255, 0.24) 0%, rgba(255, 255, 255, 0.00) 100%), #3960F9",
                          boxShadow:
                            "0 1px 2px -1px rgba(9, 6, 63, 0.40), 0 1px 0 0 rgba(255, 255, 255, 0.16) inset, 0 0 0 1px #3960F9",
                        }}
                      >
                        {upgrading ? "Upgrading..." : "Upgrade Now"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>

            <Separator className="my-4" />

            <nav className="space-y-1">
              {nav.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/dashboard" &&
                    item.href !== "/admin" &&
                    pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={(e) => {
                      if (item.label !== "Logout") return;
                      e.preventDefault();
                      signOut();
                      router.replace("/login");
                    }}
                    className={cn(
                      "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-colors",
                      isActive
                        ? "bg-[#EEF3FF] text-[#3960F9]"
                        : "text-[#555555] hover:bg-white/60 hover:text-[#000000]",
                    )}
                  >
                    <span className={cn(isActive ? "text-[#3960F9]" : "text-[#555555]")}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <Separator className="my-4" />

            <div className="rounded-xl border border-black/10 bg-white/50 p-3">
              <div className="text-xs font-semibold text-[#555555]">
                Quick links
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <Link
                  className="rounded-lg border border-black/10 bg-white/60 px-3 py-2 text-xs font-semibold text-[#000000] hover:bg-white"
                  href="/"
                >
                  Website
                </Link>
                <Link
                  className="rounded-lg border border-black/10 bg-white/60 px-3 py-2 text-xs font-semibold text-[#000000] hover:bg-white"
                  href={variant === "admin" ? "/dashboard" : "/admin"}
                >
                  {variant === "admin" ? "User view" : "Admin"}
                </Link>
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="min-w-0 flex-1 lg:ml-[284px]">
          {/* Topbar */}
          <header
            className="fixed top-6 right-6 z-20 rounded-2xl border border-black/10 p-4 shadow-sm backdrop-blur left-6 lg:left-[308px]"
            style={{
              background:
                "radial-gradient(27.92% 100% at 50% 0%, rgba(57, 96, 249, 0.06) 0%, rgba(255, 255, 255, 0.00) 100%), rgba(255, 255, 255, 0.55)",
            }}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="min-w-0">
                  <div className="truncate text-[15px] font-semibold text-[#141B34]">
                    {variant === "admin" ? "Admin Dashboard" : "Dashboard"}
                  </div>
                  <div className="truncate text-xs font-medium text-[#555555]">
                    Keep everything compliant and moving forward.
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="hidden md:block">
                  <Input
                    placeholder="Search..."
                    className="h-9 w-[240px] border-black/10 bg-white/60 placeholder:text-[#555555]"
                  />
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 rounded-xl border-black/10 bg-white/60 hover:bg-white"
                  aria-label="Notifications"
                  asChild={variant === "user"}
                >
                  {variant === "user" ? (
                    <Link href="/dashboard/notifications">
                      <Bell className="size-4" />
                    </Link>
                  ) : (
                    <Bell className="size-4" />
                  )}
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white/60 px-2 py-1.5 hover:bg-white"
                      aria-label="Account menu"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {variant === "admin" ? "AD" : "FN"}
                        </AvatarFallback>
                      </Avatar>
                      <span className="hidden text-sm font-semibold text-[#000000] sm:inline">
                        {variant === "admin" ? "Admin" : "Founder"}
                      </span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                      {variant === "admin" ? "Admin Account" : "My Account"}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={variant === "admin" ? "/admin/settings" : "/dashboard/settings"}>
                      <Settings className="mr-2 size-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={variant === "admin" ? "/admin/analytics" : "/dashboard/guides"}>
                      <BookOpen className="mr-2 size-4" />
                      {variant === "admin" ? "Analytics" : "Guides"}
                    </Link>
                  </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive"
                      onSelect={(e) => {
                        e.preventDefault();
                        signOut();
                        router.replace("/login");
                      }}
                    >
                      <LogOut className="mr-2 size-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          <main className="mt-[100px]">{children}</main>
        </div>
      </div>
    </div>
  );
}


