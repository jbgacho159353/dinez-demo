const STATUS_MAP: Record<string, { bg: string; color: string; label: string }> = {
  pending:   { bg: "rgba(234,179,8,0.15)",   color: "#eab308", label: "Pending" },
  confirmed: { bg: "rgba(59,130,246,0.15)",  color: "#3b82f6", label: "Confirmed" },
  completed: { bg: "rgba(34,197,94,0.15)",   color: "#22c55e", label: "Completed" },
  cancelled: { bg: "rgba(239,68,68,0.15)",   color: "#ef4444", label: "Cancelled" },
  new:       { bg: "rgba(234,179,8,0.15)",   color: "#eab308", label: "New" },
  contacted: { bg: "rgba(59,130,246,0.15)",  color: "#3b82f6", label: "Contacted" },
  converted: { bg: "rgba(34,197,94,0.15)",   color: "#22c55e", label: "Converted" },
  lost:      { bg: "rgba(239,68,68,0.15)",   color: "#ef4444", label: "Lost" },
  available: { bg: "rgba(34,197,94,0.15)",   color: "#22c55e", label: "Available" },
  on_job:    { bg: "rgba(59,130,246,0.15)",  color: "#3b82f6", label: "On Job" },
  off_duty:  { bg: "rgba(156,163,175,0.15)", color: "#9ca3af", label: "Off Duty" },
  maintenance: { bg: "rgba(239,68,68,0.15)", color: "#ef4444", label: "Maintenance" },
  active:    { bg: "rgba(34,197,94,0.15)",   color: "#22c55e", label: "Active" },
  inactive:  { bg: "rgba(156,163,175,0.15)", color: "#9ca3af", label: "Inactive" },
  draft:     { bg: "rgba(156,163,175,0.15)", color: "#9ca3af", label: "Draft" },
  published: { bg: "rgba(34,197,94,0.15)",   color: "#22c55e", label: "Published" },
};

export default function StatusBadge({ status }: { status: string }) {
  const s = STATUS_MAP[status?.toLowerCase()] ?? {
    bg: "rgba(156,163,175,0.15)",
    color: "#9ca3af",
    label: status ?? "Unknown",
  };
  return (
    <span
      className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize"
      style={{ background: s.bg, color: s.color }}
    >
      {s.label}
    </span>
  );
}
