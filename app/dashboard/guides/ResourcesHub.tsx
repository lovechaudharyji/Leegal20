"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, BookOpen, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PremiumLock } from "@/components/ui/premium-lock";
import { getSession } from "@/lib/localAuth";

import { RESOURCES, type ResourceCategory } from "./resources";

const CATEGORIES: readonly (ResourceCategory | "All")[] = [
  "All",
  "EIN",
  "Stripe",
  "US Tax Basics",
  "Business Tips",
] as const;

export function ResourcesHub() {
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All");
  const [query, setQuery] = useState("");
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    getSession().then(s => setIsPremium(s?.plan === "premium"));
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return RESOURCES.filter((r) => {
      const catOk = category === "All" ? true : r.category === category;
      const qOk = q
        ? r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q)
        : true;
      return catOk && qOk;
    });
  }, [category, query]);

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
            Learning & Resources
          </h1>
          <p className="mt-2 text-[15px] font-medium text-muted-foreground">
            Premium, founder-friendly guides that reduce confusion and support load.
          </p>
        </div>
        <Button asChild className="rounded-xl">
          <Link href="/dashboard/support">
            Ask a question <ArrowUpRight className="size-4" />
          </Link>
        </Button>
      </div>

      <Card className="rounded-2xl">
        <CardHeader className="pb-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle>Browse topics</CardTitle>
              <CardDescription>Search and filter by category.</CardDescription>
            </div>
            <div className="w-full lg:w-[360px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#555555]" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search resources..."
                  className="pl-9 border-black/10 bg-white/60 placeholder:text-[#555555]"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {CATEGORIES.map((c) => {
              const selected = c === category;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold transition",
                    selected
                      ? "border-[#3960F9]/30 bg-[#EEF3FF] text-[#3960F9]"
                      : "border-black/10 bg-white/60 text-[#555555] hover:bg-white",
                  )}
                >
                  <BookOpen className="size-4" />
                  {c}
                </button>
              );
            })}
          </div>
        </CardHeader>

        <CardContent>
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-black/10 bg-white/60 p-6 text-center text-sm font-medium text-muted-foreground">
              No resources match your search.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map((r) => {
                const isLocked = !isPremium && (r.category === "Stripe" || r.category === "US Tax Basics");
                return (
                <Card key={r.slug} className="rounded-2xl">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <CardTitle className="text-[18px]">{r.title}</CardTitle>
                        <CardDescription className="mt-2 text-[14px]">
                          {r.description}
                        </CardDescription>
                      </div>
                      <div className="inline-flex size-9 items-center justify-center rounded-xl bg-[#EEF3FF] text-[#3960F9]">
                        <BookOpen className="size-4" />
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <Badge variant="secondary" className="bg-[#EEF3FF] text-[#3960F9]">
                        {r.category}
                      </Badge>
                      <Badge variant="secondary" className="bg-[#F5F5F5] text-[#555555]">
                        {r.readTime}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <PremiumLock isPremium={!isLocked} triggerLabel="Upgrade to read">
                      <Button asChild variant="outline" className="w-full rounded-xl">
                        <Link href={`/dashboard/guides/${r.slug}`}>Open resource</Link>
                      </Button>
                    </PremiumLock>
                  </CardContent>
                </Card>
              )})}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}



