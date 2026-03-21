import { useState, useEffect } from "react";
import { Users, ListChecks, Home, HandCoins, Link2, Loader2, AlertCircle } from "lucide-react";
import StatCard from "../components/StatCard";
import { getDashboardPayload } from "../services/adminApi";
import type { DashboardMetrics, RecentRequestRow } from "../services/adminApi";
import StatusBadge from "../components/StatusBadge";
import type { RequestStatus } from "../../constants/admin";

const OverviewPage = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [recentRequests, setRecentRequests] = useState<RecentRequestRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getDashboardPayload()
      .then(({ metrics: m, recentRequests: r }) => {
        setMetrics(m);
        setRecentRequests(r);
      })
      .catch((err: Error) => setError(err.message || "Failed to load metrics"))
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
          type="button"
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
          label="Deals Connected"
          value={fmt(m.dealsConfirmed)}
          icon={<Link2 className="w-4 h-4" />}
          tone="success"
        />
        <StatCard
          label="Fees Pending (records)"
          value={fmt(m.feesPending)}
          icon={<HandCoins className="w-4 h-4" />}
          tone="warning"
        />
        <StatCard
          label="Revenue (Onukpa fees, GHS)"
          value={fmt(m.feesCollected)}
          icon={<HandCoins className="w-4 h-4" />}
          tone="success"
        />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 md:p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-slate-900">
            Recent renter requests
          </h3>
        </div>
        {recentRequests.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-slate-400 space-y-2">
            <ListChecks className="w-8 h-8 opacity-40" />
            <p className="text-sm text-slate-500">No requests recorded yet.</p>
          </div>
        ) : (
          <ul className="divide-y divide-slate-100">
            {recentRequests.map((r) => (
              <li
                key={r.id}
                className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
              >
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    {r.renterName}{" "}
                    <span className="text-slate-500 font-normal">· {r.phone}</span>
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {r.type} · {r.date}
                  </p>
                </div>
                <StatusBadge kind="request" status={r.status as RequestStatus} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default OverviewPage;
