import { useState, useEffect } from "react";
import { Users, ListChecks, Home, HandCoins, Link2, Loader2, AlertCircle } from "lucide-react";
import StatCard from "../components/StatCard";
import { adminApi } from "../services/adminApi";
import type { DashboardMetrics } from "../services/adminApi";

const OverviewPage = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    adminApi
      .getOverviewMetrics()
      .then(setMetrics)
      .catch((err) => setError(err.message || "Failed to load metrics"))
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
      <div className="flex flex-col items-center justify-center py-20 text-slate-500 space-y-3">
        <AlertCircle className="w-8 h-8 text-rose-400" />
        <p className="text-sm">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="text-xs text-primary hover:underline"
        >
          Retry
        </button>
      </div>
    );
  }

  const m = metrics!;
  const fmt = (n: number) => n.toLocaleString();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl md:text-2xl font-semibold text-slate-900 mb-1">
          Overview
        </h2>
        <p className="text-sm md:text-base text-slate-600">
          High-level view of renter demand, supply and performance across Onukpa.
        </p>
      </div>

      {/* Metric grid */}
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Requests"
          value={fmt(m.totalRequests)}
          icon={<ListChecks className="w-4 h-4" />}
          tone="default"
        />
        <StatCard
          label="Active Requests"
          value={fmt(m.activeRequests)}
          icon={<ListChecks className="w-4 h-4" />}
          tone="success"
        />
        <StatCard
          label="Pending Review Properties"
          value={fmt(m.pendingProperties)}
          icon={<Home className="w-4 h-4" />}
          tone="warning"
        />
        <StatCard
          label="Live Properties"
          value={fmt(m.liveProperties)}
          icon={<Home className="w-4 h-4" />}
          tone="default"
        />
        <StatCard
          label="Total Suppliers"
          value={fmt(m.totalSuppliers)}
          icon={<Users className="w-4 h-4" />}
        />
        <StatCard label="Landlords" value={fmt(m.totalLandlords)} icon={<Users className="w-4 h-4" />} />
        <StatCard label="Agents" value={fmt(m.totalAgents)} icon={<Users className="w-4 h-4" />} />
        <StatCard
          label="Matches in Progress"
          value={fmt(m.matchesInProgress)}
          icon={<Link2 className="w-4 h-4" />}
        />
        <StatCard
          label="Deals Confirmed"
          value={fmt(m.dealsConfirmed)}
          icon={<Link2 className="w-4 h-4" />}
          tone="success"
        />
        <StatCard
          label="Fees Pending"
          value={`GHS ${fmt(m.feesPending)}`}
          icon={<HandCoins className="w-4 h-4" />}
          tone="warning"
        />
        <StatCard
          label="Fees Collected"
          value={`GHS ${fmt(m.feesCollected)}`}
          icon={<HandCoins className="w-4 h-4" />}
          tone="success"
        />
      </div>

      {/* Empty state for activity feed */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 md:p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-slate-900">
            Recent Operational Activity
          </h3>
        </div>
        <div className="flex flex-col items-center justify-center py-10 text-slate-400 space-y-2">
          <ListChecks className="w-8 h-8 opacity-40" />
          <p className="text-sm text-slate-500">
            No operational activity recorded yet.
          </p>
          <p className="text-xs text-slate-400">
            Activity will appear here as requests, matches and fees flow through the system.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
