"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Download,
  Eye,
  FileText,
  Folder,
  Search,
  Upload,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PremiumLock } from "@/components/ui/premium-lock";
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

type DocCategory =
  | "Formation Documents"
  | "EIN Documents"
  | "Banking Documents"
  | "Compliance Documents";

type DocumentRow = {
  id: string;
  name: string;
  category: DocCategory;
  updated: string;
  status: "Available" | "Missing";
  fileUrl?: string;
};

const REQUIRED_BY_CATEGORY: Record<DocCategory, readonly string[]> = {
  "Formation Documents": ["Articles of Organization", "State Certificate"],
  "EIN Documents": ["IRS EIN Letter (CP575)"],
  "Banking Documents": ["Bank Approval", "Account Details PDF"],
  "Compliance Documents": ["Operating Agreement", "Annual Report Receipts"],
};

function statusBadgeClass(status: DocumentRow["status"]) {
  return status === "Available"
    ? "bg-[#EEF3FF] text-[#3960F9]"
    : "bg-[#F5F5F5] text-[#555555]";
}

export function DocumentsCenter() {
  const [category, setCategory] = useState<DocCategory>("Formation Documents");
  const [query, setQuery] = useState("");
  const [previewId, setPreviewId] = useState<string | null>(null);
  const uploadInputRef = useRef<HTMLInputElement | null>(null);
  const [docs, setDocs] = useState<DocumentRow[]>([]);
  const [loading, setLoading] = useState(true);

  // Check plan (mock/local storage)
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const session = await getSession();
        setIsPremium(session?.plan === "premium");
        
        if (session) {
            const supabase = createClient();
            const { data, error } = await supabase.from('documents').select('*').eq('user_id', session.userId);
            if (error) throw error;
            if (data) {
               const mapped = data.map(d => ({
                   id: d.id,
                   name: d.name,
                   category: d.category as DocCategory,
                   updated: new Date(d.updated_at).toLocaleDateString(),
                   status: d.status,
                   fileUrl: d.file_url
               }));
               setDocs(mapped);
            }
        }
      } catch (error) {
        console.error("Failed to load documents", error);
        toast.error("Failed to load documents");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const rowsForCategory = useMemo(() => {
    const required = REQUIRED_BY_CATEGORY[category];
    
    // Docs that match the current category from DB
    const present = docs.filter((d) => d.category === category);

    // Identify which required docs are missing
    const missing = required
      .filter((req) => !present.some((p) => p.name === req))
      .map<DocumentRow>((name) => ({
        id: `${category}:${name}`.toLowerCase().replace(/\s+/g, "-"),
        name,
        category,
        updated: "—",
        status: "Missing",
      }));

    const merged = [...present, ...missing];

    const q = query.trim().toLowerCase();
    return q ? merged.filter((r) => r.name.toLowerCase().includes(q)) : merged;
  }, [category, query, docs]);

  const previewDoc = useMemo(() => {
    if (!previewId) return null;
    return docs.find((d) => d.id === previewId) ?? null;
  }, [previewId, docs]);

  function triggerUpload() {
    uploadInputRef.current?.click();
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const session = await getSession();
    if (!session) return;
    
    const supabase = createClient();
    const { data, error } = await supabase.from('documents').insert({
        user_id: session.userId,
        name: file.name,
        category: category,
        status: 'Available',
        file_url: '/file.svg' // Mock URL since we don't have storage bucket info
    }).select().single();
    
    if (data) {
        setDocs(prev => [...prev, {
            id: data.id,
            name: data.name,
            category: data.category as DocCategory,
            updated: new Date().toLocaleDateString(),
            status: "Available",
            fileUrl: "/file.svg"
        }]);
    }
    
    // Reset input
    if (uploadInputRef.current) uploadInputRef.current.value = "";
  }

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
            Documents Center
          </h1>
          <p className="mt-2 text-[15px] font-medium text-muted-foreground">
            Formation, EIN, banking, and compliance documents — organized and easy to find.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <input ref={uploadInputRef} type="file" className="hidden" onChange={handleUpload} />
          <PremiumLock isPremium={isPremium} triggerLabel="Upgrade to Upload">
            <Button variant="outline" className="rounded-xl" onClick={triggerUpload}>
              <Upload className="size-4" />
              Upload
            </Button>
          </PremiumLock>
          <PremiumLock isPremium={isPremium} triggerLabel="Upgrade to Download">
            <Button className="rounded-xl" asChild>
              <a href="/file.svg" download>
                Download <Download className="size-4" />
              </a>
            </Button>
          </PremiumLock>
        </div>
      </div>

      <Card className="rounded-2xl">
        <CardHeader className="pb-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle>Categories</CardTitle>
              <CardDescription>Browse by document type and upload missing files.</CardDescription>
            </div>
            <div className="w-full lg:w-[360px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#555555]" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search documents..."
                  className="pl-9 border-black/10 bg-white/60 placeholder:text-[#555555]"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {(Object.keys(REQUIRED_BY_CATEGORY) as DocCategory[]).map((c) => {
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
                      : "border-black/5 bg-white text-[#555555] hover:bg-muted/50",
                  )}
                >
                  <Folder className={cn("size-4", selected ? "text-[#3960F9]" : "text-[#555555]")} />
                  {c}
                </button>
              );
            })}
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="w-[60px]"></TableHead>
                <TableHead>Document Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rowsForCategory.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                    No documents found.
                  </TableCell>
                </TableRow>
              ) : (
                rowsForCategory.map((doc) => (
                  <TableRow
                    key={doc.id}
                    className="cursor-pointer hover:bg-muted/30"
                    onClick={() => {
                      if (doc.status === "Available") setPreviewId(doc.id);
                    }}
                  >
                    <TableCell>
                      <div className="flex size-9 items-center justify-center rounded-lg bg-[#EEF3FF] text-[#3960F9]">
                        <FileText className="size-4" />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-[#141B34]">{doc.name}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={statusBadgeClass(doc.status)}>
                        {doc.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{doc.updated}</TableCell>
                    <TableCell className="text-right">
                      {doc.status === "Available" ? (
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8"
                            onClick={(e) => {
                              e.stopPropagation();
                              setPreviewId(doc.id);
                            }}
                          >
                            <Eye className="size-4 text-[#555555]" />
                          </Button>
                          <PremiumLock isPremium={isPremium} triggerLabel="">
                            <Button variant="ghost" size="icon" className="size-8">
                              <Download className="size-4 text-[#555555]" />
                            </Button>
                          </PremiumLock>
                        </div>
                      ) : (
                        <PremiumLock isPremium={isPremium} triggerLabel="Upload">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs text-[#3960F9]"
                            onClick={(e) => {
                              e.stopPropagation();
                              triggerUpload();
                            }}
                          >
                            Upload
                          </Button>
                        </PremiumLock>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Preview Modal */}
      {previewId && previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="relative h-full max-h-[85vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-border p-4">
              <h3 className="text-lg font-semibold text-[#141B34]">{previewDoc.name}</h3>
              <Button variant="ghost" size="icon" onClick={() => setPreviewId(null)}>
                <X className="size-5" />
              </Button>
            </div>
            <div className="flex h-full flex-col items-center justify-center bg-muted/10 p-10">
              <img src="/file.svg" alt="Preview" className="h-32 w-32 opacity-50" />
              <p className="mt-4 text-muted-foreground">Preview not available in demo</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
