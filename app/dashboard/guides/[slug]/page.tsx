import Link from "next/link";
import { ArrowLeft, BookOpen, Clock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { RESOURCES } from "../resources";

export default async function ResourceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resource = RESOURCES.find((r) => r.slug === slug) ?? RESOURCES[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <Button asChild variant="outline" className="rounded-xl">
          <Link href="/dashboard/guides">
            <ArrowLeft className="size-4" />
            Back
          </Link>
        </Button>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="bg-[#EEF3FF] text-[#3960F9]">
            <BookOpen className="mr-2 size-4" />
            {resource.category}
          </Badge>
          <Badge variant="secondary" className="bg-[#F5F5F5] text-[#555555]">
            <Clock className="mr-2 size-4" />
            {resource.readTime}
          </Badge>
        </div>
      </div>

      <div>
        <h1
          className="text-[28px] font-semibold leading-[1.15] text-[#141B34] sm:text-[32px]"
          style={{
            fontFamily:
              '"Inter Display", Inter, var(--font-sans), ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial',
          }}
        >
          {resource.title}
        </h1>
        <p className="mt-2 text-[15px] font-medium text-muted-foreground">
          {resource.description}
        </p>
      </div>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Key takeaways</CardTitle>
          <CardDescription>Practical steps you can apply immediately.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {resource.body.map((section) => (
            <div key={section.heading} className="rounded-2xl border border-border bg-white/60 p-4 shadow-sm">
              <div className="text-sm font-semibold text-[#141B34]">{section.heading}</div>
              <ul className="mt-3 space-y-2 text-sm font-medium text-muted-foreground">
                {section.points.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span className="mt-1 inline-flex size-4 items-center justify-center rounded-full bg-[#EEF3FF] text-[11px] font-bold text-[#3960F9]">
                      ✓
                    </span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}



