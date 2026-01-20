"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowUpRight,
  Calendar,
  LifeBuoy,
  MessageSquareText,
  Paperclip,
  Plus,
  Send,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getSession } from "@/lib/localAuth";
import { createClient } from "@/lib/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type TicketStatus = "Open" | "In progress" | "Resolved";
type Ticket = {
  id: string;
  subject: string;
  status: TicketStatus;
  updated: string;
};

function StatusBadge({ status }: { status: TicketStatus }) {
  const cls =
    status === "Resolved"
      ? "bg-[#EEF3FF] text-[#3960F9]"
      : "bg-[#F5F5F5] text-[#555555]";
  return (
    <Badge variant="secondary" className={cls}>
      {status}
    </Badge>
  );
}

export function SupportCenter() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [query, setQuery] = useState("");
  const [isNewOpen, setIsNewOpen] = useState(false);
  const [newSubject, setNewSubject] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    async function load() {
      const session = await getSession();
      
      if (session) {
        const supabase = createClient();
        const { data } = await supabase
          .from("support_tickets")
          .select("*")
          .eq("user_id", session.userId)
          .order("created_at", { ascending: false });

        if (data) {
          setTickets(
            data.map((t) => ({
              id: t.id.slice(0, 8).toUpperCase(),
              subject: t.subject,
              status: t.status as TicketStatus,
              updated: new Date(t.updated_at).toLocaleDateString(),
            }))
          );
        }
      }
    }
    load();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return tickets;
    return tickets.filter(
      (t) => t.id.toLowerCase().includes(q) || t.subject.toLowerCase().includes(q),
    );
  }, [tickets, query]);

  function openNewTicket() {
    setIsNewOpen(true);
  }

  function closeNewTicket() {
    setIsNewOpen(false);
    setNewSubject("");
    setNewMessage("");
    setFiles([]);
  }

  function onPickFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const picked = Array.from(e.target.files ?? []);
    setFiles((prev) => [...prev, ...picked]);
  }

  async function createTicket() {
    try {
      const subject = newSubject.trim() || "New support request";
      const session = await getSession();
      if (!session) return;

      const supabase = createClient();
      const { data, error } = await supabase
        .from("support_tickets")
        .insert({
          user_id: session.userId,
          subject: subject,
          description: newMessage,
          status: "Open",
        })
        .select()
        .single();

      if (error) throw error;

      if (data) {
        setTickets((prev) => [
          {
            id: data.id.slice(0, 8).toUpperCase(),
            subject: data.subject,
            status: data.status as TicketStatus,
            updated: "Just now",
          },
          ...prev,
        ]);
        closeNewTicket();
        toast.success("Support ticket created successfully");
      }
    } catch (error) {
      console.error("Failed to create ticket", error);
      toast.error("Failed to create support ticket");
    }
  }

  return (
    <Card className="flex h-full flex-col overflow-hidden rounded-2xl border-none shadow-none ring-1 ring-black/10">
      <CardHeader className="border-b border-border bg-muted/20 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-[#141B34]">Support Tickets</CardTitle>
            <CardDescription>Track status of your requests.</CardDescription>
          </div>
          <Button onClick={openNewTicket} size="sm" className="gap-2 rounded-lg text-sm">
            <Plus className="size-4" />
            New Ticket
          </Button>
        </div>
      </CardHeader>

      {isNewOpen && (
        <div className="border-b border-border bg-[#EEF3FF]/30 p-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-[#141B34]">New Support Request</h3>
              <Button variant="ghost" size="icon" className="size-6" onClick={closeNewTicket}>
                <X className="size-4" />
              </Button>
            </div>
            <Input
              placeholder="Subject"
              className="bg-white"
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
            />
            <textarea
              className="min-h-[80px] w-full rounded-md border border-input bg-white px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              placeholder="Describe your issue..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 text-xs"
                  onClick={() => fileRef.current?.click()}
                >
                  <Paperclip className="size-3" />
                  Attach files
                </Button>
                <input
                  type="file"
                  multiple
                  className="hidden"
                  ref={fileRef}
                  onChange={onPickFiles}
                />
                {files.length > 0 && (
                  <span className="text-xs text-muted-foreground">
                    {files.length} file(s)
                  </span>
                )}
              </div>
              <Button size="sm" onClick={createTicket} className="gap-2">
                <Send className="size-3" />
                Submit
              </Button>
            </div>
          </div>
        </div>
      )}

      <CardContent className="flex-1 overflow-auto p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Last Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                  No tickets found.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((t) => (
                <TableRow key={t.id} className="cursor-pointer hover:bg-muted/30">
                  <TableCell className="font-medium text-[#141B34]">{t.id}</TableCell>
                  <TableCell>{t.subject}</TableCell>
                  <TableCell>
                    <StatusBadge status={t.status} />
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">{t.updated}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>

      <div className="border-t border-border bg-muted/20 p-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <LifeBuoy className="size-4" />
            <span>Support Center</span>
          </div>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-2">
            <MessageSquareText className="size-4" />
            <span>Live Chat (Coming Soon)</span>
          </div>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-2 cursor-pointer hover:text-primary">
             <Calendar className="size-4" />
             <span>Book a call</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
