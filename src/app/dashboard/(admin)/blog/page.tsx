"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { format } from "date-fns";

type Post = {
  id: string;
  title: string;
  slug: string;
  category?: string;
  status: string;
  published_at?: string;
  views: number;
  created_at: string;
};

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const load = () => {
    const params = filter !== "all" ? `?status=${filter}` : "";
    fetch(`/api/dashboard/blog${params}`).then((r) => r.json()).then((d) => {
      setPosts(Array.isArray(d) ? d : []);
      setLoading(false);
    });
  };

  useEffect(() => { load(); }, [filter]); // eslint-disable-line react-hooks/exhaustive-deps

  async function togglePublish(post: Post) {
    const newStatus = post.status === "published" ? "draft" : "published";
    await fetch("/api/dashboard/blog", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: post.id, status: newStatus }),
    });
    setPosts((prev) => prev.map((p) => (p.id === post.id ? { ...p, status: newStatus } : p)));
  }

  async function remove(id: string) {
    if (!confirm("Delete this post?")) return;
    await fetch(`/api/dashboard/blog?id=${id}`, { method: "DELETE" });
    setPosts((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Blog Posts</h2>
          <p className="text-gray-500 text-sm mt-0.5">{posts.length} posts</p>
        </div>
        <Link href="/dashboard/blog/new" className="px-4 py-2 rounded-lg text-sm font-semibold" style={{ background: "#C9A435", color: "#000" }}>
          + New Post
        </Link>
      </div>

      <div className="flex gap-1">
        {["all", "published", "draft"].map((s) => (
          <button key={s} onClick={() => setFilter(s)} className="px-3 py-2 rounded-lg text-xs font-semibold capitalize" style={filter === s ? { background: "#C9A435", color: "#000" } : { background: "#1A1A1A", color: "#888", border: "1px solid rgba(255,255,255,0.08)" }}>{s}</button>
        ))}
      </div>

      <div className="rounded-xl overflow-hidden" style={{ background: "#1A1A1A", border: "1px solid rgba(255,255,255,0.06)" }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              {["Title", "Category", "Status", "Published", "Views", "Actions"].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? [...Array(4)].map((_, i) => (
              <tr key={i}>{[...Array(6)].map((_, j) => <td key={j} className="px-4 py-3"><div className="h-4 rounded animate-pulse" style={{ background: "rgba(255,255,255,0.06)" }} /></td>)}</tr>
            )) : posts.map((p, i) => (
              <tr key={p.id} style={{ background: i % 2 ? "rgba(255,255,255,0.01)" : "transparent", borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                <td className="px-4 py-3">
                  <Link href={`/dashboard/blog/${p.id}/edit`} className="text-white font-medium hover:text-[#C9A435] transition-colors">{p.title}</Link>
                  <div className="text-xs text-gray-600 mt-0.5">/blog/{p.slug}</div>
                </td>
                <td className="px-4 py-3 text-gray-400 text-xs">{p.category ?? "—"}</td>
                <td className="px-4 py-3"><StatusBadge status={p.status} /></td>
                <td className="px-4 py-3 text-xs text-gray-500">
                  {p.published_at ? format(new Date(p.published_at), "d MMM yyyy") : "—"}
                </td>
                <td className="px-4 py-3 text-gray-300">{p.views ?? 0}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <Link href={`/dashboard/blog/${p.id}/edit`} className="text-xs px-2 py-1 rounded text-gray-400" style={{ background: "rgba(255,255,255,0.05)" }}>Edit</Link>
                    <button onClick={() => togglePublish(p)} className="text-xs px-2 py-1 rounded" style={p.status === "published" ? { background: "rgba(156,163,175,0.1)", color: "#9ca3af" } : { background: "rgba(34,197,94,0.1)", color: "#22c55e" }}>
                      {p.status === "published" ? "Unpublish" : "Publish"}
                    </button>
                    <button onClick={() => remove(p.id)} className="text-xs px-2 py-1 rounded" style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444" }}>✕</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!loading && posts.length === 0 && (
          <div className="text-center py-12 text-gray-600"><div className="text-4xl mb-2">📝</div><p>No posts yet. <Link href="/dashboard/blog/new" className="text-[#C9A435] hover:underline">Write your first post →</Link></p></div>
        )}
      </div>
    </div>
  );
}
