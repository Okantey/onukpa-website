import { Inbox } from "lucide-react";
import SectionCard from "../components/SectionCard";

const AnalyticsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl md:text-2xl font-semibold text-slate-900 mb-1">Analytics</h2>
        <p className="text-sm md:text-base text-slate-600">
          Operational insights and marketplace health.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <SectionCard title="Match Conversion Funnel" description="From total requests to confirmed deals">
          <div className="flex flex-col items-center justify-center py-10 text-slate-400 space-y-3">
            <Inbox className="w-8 h-8 opacity-40" />
            <p className="text-sm text-slate-500">Not enough data yet</p>
            <p className="text-xs text-slate-400 max-w-xs text-center">
              Conversion funnel data will populate as renter requests flow through matches and deals.
            </p>
          </div>
        </SectionCard>

        <SectionCard title="Response Metrics" description="Time-to-action averages">
          <div className="flex flex-col items-center justify-center py-10 text-slate-400 space-y-3">
            <Inbox className="w-8 h-8 opacity-40" />
            <p className="text-sm text-slate-500">No response data available</p>
            <p className="text-xs text-slate-400 max-w-xs text-center">
              Response time metrics will appear once enough matches and supplier responses have been recorded.
            </p>
          </div>
        </SectionCard>
      </div>
    </div>
  );
};

export default AnalyticsPage;
