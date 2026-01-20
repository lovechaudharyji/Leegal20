"use client";

import Link from "next/link";
import { ArrowUpRight, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface User {
  id: string;
  full_name: string;
  email: string;
  plan: string;
  created_at: string;
  status?: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const supabase = createClient();

  useEffect(() => {
    async function fetchUsers() {
      try {
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .order("created_at", { ascending: false });
        
        if (error) throw error;
        setUsers(data || []);
      } catch (err) {
        console.error("Error fetching users:", err);
        toast.error("Failed to load users");
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  const handleInvite = () => {
    toast.success("Invitation sent successfully");
  };

  const handleCreate = () => {
    toast.success("Account creation initiated");
  };

  const filteredUsers = users.filter(u => 
    u.full_name?.toLowerCase().includes(search.toLowerCase()) || 
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

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
            Users
          </h1>
          <p className="mt-2 text-[15px] font-medium text-muted-foreground">
            Manage customer accounts, plans, and access.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="rounded-xl" onClick={handleInvite}>
            Invite user <UserPlus className="size-4" />
          </Button>
          <Button className="rounded-xl" onClick={handleCreate}>
            Create account <ArrowUpRight className="size-4" />
          </Button>
        </div>
      </div>

      <Card className="rounded-2xl">
        <CardHeader className="pb-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>User directory</CardTitle>
              <CardDescription>Search and manage accounts.</CardDescription>
            </div>
            <div className="w-full sm:w-[320px]">
              <Input
                placeholder="Search users..."
                className="border-black/10 bg-white/60 placeholder:text-[#555555]"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    Loading users...
                  </TableCell>
                </TableRow>
              ) : filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    No users found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell className="font-semibold text-[#141B34]">{u.full_name}</TableCell>
                    <TableCell className="text-sm font-medium text-muted-foreground">{u.email}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-[#EEF3FF] text-[#3960F9]">
                        {u.plan}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm font-semibold text-muted-foreground">
                      Active
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" className="h-9 rounded-xl px-3">
                        Manage
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}



