import type { ReactNode } from "react";
import { DashboardShell } from "../components/dashboard/DashboardShell";
import { RequireAuth } from "../components/auth/RequireAuth";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <RequireAuth role="admin">
      <DashboardShell variant="admin">{children}</DashboardShell>
    </RequireAuth>
  );
}


