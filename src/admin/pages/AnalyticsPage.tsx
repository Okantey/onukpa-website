import { useEffect, useState } from "react";
import { Loader2, AlertCircle, Inbox } from "lucide-react";
import SectionCard from "../components/SectionCard";
import { fetchAnalytics } from "../services/analyticsApi";
import type { AnalyticsBreakdownRow } from "../services/adminTypes";

function BreakdownList({ rows, emptyLabel }: { rows: AnalyticsBreakdownRow[]; emptyLabel: string }) {
  if (!rows?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-slate-400">
        <Inbox className="w-8 h-8 opacity-40 mb-2" />
        <p className="text-sm">{emptyLabel}</p>
      </div>
    );
  }
  const max = Math.max(...rows.map((r) => r.count), 1);
  return (
    <ul className="space-y-3">
      {rows.map((row) => (
        <li key={String(row._id)}>
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-slate-800">{row._id || "—"}</span>
            <span className="text-slate-500">{row.count}</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary/80 rounded-full transition-all"
              style={{ width: `${(row.count / max) * 100}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

const AnalyticsPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [byCategory, setByCategory] = useState<AnalyticsBreakdownRow[]>([]);
  const [topLocations, setTopLocations] = useState<AnalyticsBreakdownRow[]>([]);

  useEffect(() => {
    fetchAnalytics()
      .then((stats) => {
        setByCategory(stats.breakdown.byCategory ?? []);
        setTopLocations(stats.breakdown.topLocations ?? []);
      })
      .catch((e: Error) => setError(e.message || "Failed to load analytics"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-500 gap-2">
        <AlertCircle className="w-8 h-8 text-rose-400" />
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl md:text-2xl font-semibold text-slate-900 mb-1">Analytics</h2>
        <p className="text-sm md:text-base text-slate-600">
          Inventory distribution from live MongoDB counts (same source as Overview).
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <SectionCard
          title="Listings by category"
          description="Property documents grouped by `propertyCategory`"
        >
          <BreakdownList rows={byCategory} emptyLabel="No property data yet" />
        </SectionCard>

        <SectionCard
          title="Top areas"
          description="Top 5 areas by listing count"
        >
          <BreakdownList rows={topLocations} emptyLabel="No location data yet" />
        </SectionCard>
      </div>
    </div>
  );
};

export default AnalyticsPage;
