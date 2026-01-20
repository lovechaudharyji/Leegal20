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
      const session = await getSession();
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


