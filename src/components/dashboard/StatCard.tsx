interface StatCardProps {
  icon: string;
  label: string;
  value: string | number;
  sub?: string;
  trend?: number; // percent change vs previous period
  onClick?: () => void;
}

export default function StatCard({ icon, label, value, sub, trend, onClick }: StatCardProps) {
  return (
    <div
      className="rounded-xl p-5 cursor-default transition-all duration-200"
      style={{
        background: "#1A1A1A",
        border: "1px solid rgba(201,164,53,0.2)",
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(201,164,53,0.45)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 20px rgba(201,164,53,0.08)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(201,164,53,0.2)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-2xl">{icon}</span>
        {trend !== undefined && (
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{
              background: trend >= 0 ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.12)",
              color: trend >= 0 ? "#22c55e" : "#ef4444",
            }}
          >
            {trend >= 0 ? "▲" : "▼"} {Math.abs(trend).toFixed(1)}%
          </span>
        )}
      </div>
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <div className="text-sm text-gray-500">{label}</div>
      {sub && <div className="text-xs text-gray-600 mt-1">{sub}</div>}
    </div>
  );
}
