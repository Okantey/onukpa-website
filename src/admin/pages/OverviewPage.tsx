import { Users, ListChecks, Home, HandCoins, Link2 } from "lucide-react";
import StatCard from "../components/StatCard";

const OverviewPage = () => {
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
          value="1,248"
          icon={<ListChecks className="w-4 h-4" />}
          trendLabel="+12% vs last week"
          tone="default"
        />
        <StatCard
          label="Active Requests"
          value="312"
          icon={<ListChecks className="w-4 h-4" />}
          trendLabel="Most in East Legon & Madina"
          tone="success"
        />
        <StatCard
          label="Pending Review Properties"
          value="47"
          icon={<Home className="w-4 h-4" />}
          trendLabel="Review queue"
          tone="warning"
        />
        <StatCard
          label="Live Properties"
          value="382"
          icon={<Home className="w-4 h-4" />}
          trendLabel="Landlord-first majority"
          tone="default"
        />
        <StatCard
          label="Total Suppliers"
          value="129"
          icon={<Users className="w-4 h-4" />}
        />
        <StatCard label="Landlords" value="76" icon={<Users className="w-4 h-4" />} />
        <StatCard label="Agents" value="53" icon={<Users className="w-4 h-4" />} />
        <StatCard
          label="Matches in Progress"
          value="88"
          icon={<Link2 className="w-4 h-4" />}
        />
        <StatCard
          label="Deals Confirmed"
          value="214"
          icon={<Link2 className="w-4 h-4" />}
          trendLabel="+6 this week"
          tone="success"
        />
        <StatCard
          label="Fees Pending"
          value="GHS 18,400"
          icon={<HandCoins className="w-4 h-4" />}
          tone="warning"
        />
        <StatCard
          label="Fees Collected"
          value="GHS 52,900"
          icon={<HandCoins className="w-4 h-4" />}
          tone="success"
        />
      </div>

      {/* Simple chart-style cards */}
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 md:p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                Requests by Type
              </h3>
              <p className="text-xs text-slate-500">
                Snapshot of active demand across categories.
              </p>
            </div>
          </div>
          <div className="space-y-3">
            {[
              { label: "Rooms", value: 45 },
              { label: "Apartments", value: 30 },
              { label: "Campus Hostels", value: 15 },
              { label: "Office / Store Space", value: 10 },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between">
                <span className="text-xs md:text-sm text-slate-700">
                  {row.label}
                </span>
                <div className="flex items-center gap-2 w-44 md:w-56">
                  <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary/80"
                      style={{ width: `${row.value}%` }}
                    />
                  </div>
                  <span className="text-xs text-slate-500">{row.value}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 md:p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                Landlord vs Agent Supply
              </h3>
              <p className="text-xs text-slate-500">
                Live properties split by supplier type.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                <span className="text-xs text-slate-700">Landlords</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                <span className="text-xs text-slate-700">Agents</span>
              </div>
            </div>
            <div className="relative w-28 h-28">
              <div className="absolute inset-0 rounded-full border-[10px] border-primary/80" />
              <div className="absolute inset-2 rounded-full border-[10px] border-slate-300" />
              <div className="absolute inset-6 flex items-center justify-center">
                <span className="text-xs text-slate-600 text-center">
                  68% Landlord
                  <br />
                  32% Agent
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent activity placeholder */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 md:p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-slate-900">
            Recent Operational Activity
          </h3>
          <span className="text-xs text-slate-500">Last few minutes</span>
        </div>
        <div className="space-y-3 text-xs md:text-sm text-slate-700">
          <p className="text-slate-500">
            Live activity feed will appear here once connected to the audit log
            API. For now, this is a calm placeholder with room for a timeline
            view.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;

