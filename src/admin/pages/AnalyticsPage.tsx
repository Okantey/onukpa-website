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
        <SectionCard title="Match Conversion Funnel" description="From total requests to confirmed deals (Last 30 Days)">
          <div className="space-y-4 pt-2">
            {[
              { label: "Total Requests", value: 340, percent: 100, color: "bg-slate-200" },
              { label: "Property Found", value: 290, percent: 85, color: "bg-sky-200" },
              { label: "Renter Interested", value: 180, percent: 52, color: "bg-indigo-300" },
              { label: "Connected", value: 150, percent: 44, color: "bg-primary/60" },
              { label: "Deal Confirmed", value: 65, percent: 19, color: "bg-emerald-500" },
            ].map((step, i) => (
              <div key={i} className="flex flex-col gap-1">
                <div className="flex justify-between text-xs text-slate-600">
                  <span className="font-medium text-slate-900">{step.label}</span>
                  <span>{step.value} ({step.percent}%)</span>
                </div>
                <div className="w-full bg-slate-50 h-6 rounded-md overflow-hidden flex">
                  <div className={`h-full ${step.color} transition-all duration-1000`} style={{ width: `${step.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Response Metrics" description="Time-to-action averages">
          <div className="grid grid-cols-2 gap-4 h-full content-start">
            <div className="bg-slate-50 p-4 border border-slate-100 rounded-xl text-center">
              <p className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Avg Time to Match</p>
              <p className="text-3xl font-bold text-slate-800">4<span className="text-lg text-slate-500 font-medium">h</span></p>
              <p className="text-[10px] text-emerald-600 mt-2 font-medium">Faster than last week</p>
            </div>
            <div className="bg-slate-50 p-4 border border-slate-100 rounded-xl text-center">
              <p className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Supplier Response</p>
              <p className="text-3xl font-bold text-slate-800">1.2<span className="text-lg text-slate-500 font-medium">h</span></p>
              <p className="text-[10px] text-amber-600 mt-2 font-medium">Slightly slower</p>
            </div>
            <div className="bg-slate-50 p-4 border border-slate-100 rounded-xl text-center col-span-2">
              <p className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Top Performing Area</p>
              <p className="text-xl font-bold text-primary">East Legon</p>
              <p className="text-xs text-slate-600 mt-1">45 deals this month</p>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
};

export default AnalyticsPage;
