import Link from "next/link";
import { ArrowLeft, Paperclip, Send } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const TICKETS = [
  {
    id: "T-2241",
    subject: "EIN request review",
    status: "Open",
    messages: [
      { from: "You", text: "Can you confirm the EIN draft details before submission?", time: "Today 10:12" },
      { from: "Support", text: "Sure — please share the best contact email and your legal name spelling.", time: "Today 10:48" },
    ],
  },
  {
    id: "T-2236",
    subject: "Banking verification question",
    status: "In progress",
    messages: [
      { from: "You", text: "Mercury asked for address proof — what should I upload?", time: "Yesterday 15:03" },
      { from: "Support", text: "Upload your state certificate + business address document (if available).", time: "Yesterday 16:10" },
    ],
  },
  {
    id: "T-2218",
    subject: "Operating agreement clarification",
    status: "Resolved",
    messages: [
      { from: "You", text: "Do I need to sign the operating agreement before EIN?", time: "Jan 10 09:20" },
      { from: "Support", text: "Not required for EIN, but recommended for banking and records.", time: "Jan 10 11:05" },
    ],
  },
] as const;

function badgeClass(status: string) {
  return status === "Resolved" ? "bg-[#EEF3FF] text-[#3960F9]" : "bg-[#F5F5F5] text-[#555555]";
}

export default async function TicketDetailsPage({
  params,
}: {
  params: Promise<{ ticketId: string }>;
}) {
  const { ticketId } = await params;
  const t = TICKETS.find((x) => x.id === ticketId) ?? TICKETS[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <Button asChild variant="outline" className="rounded-xl">
          <Link href="/dashboard/support">
            <ArrowLeft className="size-4" />
            Back
          </Link>
        </Button>
        <Badge variant="secondary" className={badgeClass(t.status)}>
          {t.status}
        </Badge>
      </div>

      <div>
        <h1
          className="text-[22px] font-semibold text-[#141B34] sm:text-[26px]"
          style={{
            fontFamily:
              '"Inter Display", Inter, var(--font-sans), ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial',
          }}
        >
          {t.id}: {t.subject}
        </h1>
        <p className="mt-2 text-[15px] font-medium text-muted-foreground">
          Track replies and add attachments.
        </p>
      </div>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Conversation</CardTitle>
          <CardDescription>All messages for this ticket.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {t.messages.map((m, idx) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={idx} className="rounded-2xl border border-border bg-white/60 p-4 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-semibold text-[#141B34]">{m.from}</div>
                <div className="text-xs font-medium text-muted-foreground">{m.time}</div>
              </div>
              <div className="mt-2 text-sm font-medium text-muted-foreground">{m.text}</div>
            </div>
          ))}

          <div className="rounded-2xl border border-border bg-muted/30 p-4">
            <div className="text-sm font-semibold text-[#141B34]">Reply</div>
            <textarea
              className="mt-2 w-full rounded-xl border border-black/10 bg-white/60 p-3 text-sm font-medium text-[#141B34] placeholder:text-[#555555] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3960F9]/30"
              rows={4}
              placeholder="Write your reply..."
            />
            <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <Button variant="outline" className="rounded-xl">
                <Paperclip className="mr-2 size-4" />
                Upload files
              </Button>
              <Button className="rounded-xl">
                Send reply <Send className="size-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}



