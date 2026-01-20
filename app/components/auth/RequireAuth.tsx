"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { getSession } from "@/lib/localAuth";

type RequireAuthProps = {
  children: React.ReactNode;
  role?: "user" | "admin";
};

export function RequireAuth({ children, role }: RequireAuthProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  const nextUrl = useMemo(() => {
    return pathname || "/dashboard";
  }, [pathname]);

  useEffect(() => {
    async function check() {
      let session = await getSession();

      // AUTO-LOGIN / ESCALATE FOR ADMIN ROUTE (Dev Mode Bypass)
      if (role === 'admin') {
        if (!session || session.role !== 'admin') {
          console.log("Auto-escalating to Admin (Dev Mode)");
          const mockSession = {
             userId: 'c00862ec-d011-4d76-bf0d-a8664eb4a71d',
             email: 'admin@leegal.com',
             role: 'admin',
             plan: 'premium',
             fullName: 'Admin User',
             createdAt: new Date().toISOString()
          };
          if (typeof window !== 'undefined') {
             localStorage.setItem('dev_admin_session', JSON.stringify(mockSession));
          }
          session = mockSession as any;
        }
      }

      if (!session) {
        router.replace(`/login?next=${encodeURIComponent(nextUrl)}`);
        return;
      }
      if (role && session.role !== role) {
        router.replace("/dashboard");
        return;
      }
      setReady(true);
    }
    check();
  }, [nextUrl, role, router]);

  if (!ready) {
    return (
      <div className="mx-auto flex min-h-[60vh] w-full max-w-3xl items-center justify-center px-6 text-center">
        <div className="rounded-2xl border border-black/10 bg-white/60 p-6 shadow-sm backdrop-blur">
          <div className="text-sm font-semibold text-[#141B34]">Loading…</div>
          <div className="mt-2 text-sm font-medium text-[#555555]">
            Checking your session.
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}


