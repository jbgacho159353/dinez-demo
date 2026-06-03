"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const CATEGORIES = ["Airport Transfers", "Corporate Travel", "London Guide", "Travel Tips", "Chauffeur Services", "Company News"];

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function NewPostPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "", slug: "", excerpt: "", content: "", cover_image: "",
    category: "", seo_title: "", seo_description: "", status: "draft", author: "Dinez Team",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function set(field: string, value: string) {
    setForm((f) => {
      const next = { ...f, [field]: value };
      if (field === "title" && !f.slug) next.slug = slugify(value);
      return next;
    });
  }

  async function save(publish: boolean) {
    if (!form.title || !form.slug) { setError("Title and slug are required."); return; }
    setSaving(true); setError("");
    const r = await fetch("/api/dashboard/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, status: publish ? "published" : "draft" }),
    });
    const data = await r.json();
    if (data.error) { setError(data.error); setSaving(false); return; }
    router.push("/dashboard/blog");
  }

  return (
    <div className="max-w-3xl space-y-5">
      <div className="flex items-center gap-3">
        <Link href="/dashboard/blog" className="text-gray-500 hover:text-white text-sm">← Back</Link>
        <h2 className="text-2xl font-bold text-white">New Post</h2>
      </div>

      {error && <div className="px-4 py-3 rounded-lg text-sm text-red-400" style={{ background: "rgba(239,68,68,0.1)" }}>{error}</div>}

      <div className="rounded-xl p-6 space-y-5" style={{ background: "#1A1A1A", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div>
          <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1.5">Title *</label>
          <input value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="Post title…" className="w-full px-4 py-3 rounded-lg text-white text-base outline-none" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.1)" }} />
        </div>
        <div>
          <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1.5">Slug *</label>
          <input value={form.slug} onChange={(e) => set("slug", slugify(e.target.value))} className="w-full px-4 py-2 rounded-lg text-white text-sm outline-none font-mono" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.1)" }} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1.5">Category</label>
            <select value={form.category} onChange={(e) => set("category", e.target.value)} className="w-full px-3 py-2 rounded-lg text-white text-sm outline-none" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.1)" }}>
              <option value="">Select…</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1.5">Author</label>
            <input value={form.author} onChange={(e) => set("author", e.target.value)} className="w-full px-3 py-2 rounded-lg text-white text-sm outline-none" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.1)" }} />
          </div>
        </div>
        <div>
          <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1.5">Excerpt (SEO preview)</label>
          <textarea value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} rows={2} className="w-full px-4 py-2 rounded-lg text-white text-sm outline-none resize-none" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.1)" }} />
        </div>
        <div>
          <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1.5">Content</label>
          <textarea value={form.content} onChange={(e) => set("content", e.target.value)} rows={14} placeholder="Write your post content here…" className="w-full px-4 py-3 rounded-lg text-white text-sm outline-none resize-y font-mono leading-relaxed" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.1)" }} />
        </div>
        <div>
          <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1.5">Cover Image URL</label>
          <input value={form.cover_image} onChange={(e) => set("cover_image", e.target.value)} placeholder="https://…" className="w-full px-4 py-2 rounded-lg text-white text-sm outline-none" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.1)" }} />
        </div>
        <div className="border-t border-white/5 pt-4">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">SEO</p>
          <div className="space-y-3">
            <input value={form.seo_title} onChange={(e) => set("seo_title", e.target.value)} placeholder="SEO Title (defaults to post title)" className="w-full px-4 py-2 rounded-lg text-white text-sm outline-none" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.1)" }} />
            <textarea value={form.seo_description} onChange={(e) => set("seo_description", e.target.value)} rows={2} placeholder="SEO Description (defaults to excerpt)" className="w-full px-4 py-2 rounded-lg text-white text-sm outline-none resize-none" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.1)" }} />
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={() => save(false)} disabled={saving} className="px-6 py-2.5 rounded-lg text-sm font-semibold text-gray-300" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
          {saving ? "Saving…" : "Save as Draft"}
        </button>
        <button onClick={() => save(true)} disabled={saving} className="px-6 py-2.5 rounded-lg text-sm font-semibold" style={{ background: "#C9A435", color: "#000" }}>
          {saving ? "Publishing…" : "Publish Now"}
        </button>
      </div>
    </div>
  );
}
