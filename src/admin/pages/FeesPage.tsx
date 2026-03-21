import { useState, useEffect } from "react";
import { Eye, HandCoins, Loader2, Inbox } from "lucide-react";
import DataTable from "../components/DataTable";
import type { Column } from "../components/DataTable";
import FilterBar from "../components/FilterBar";
import StatusBadge from "../components/StatusBadge";
import { adminApi } from "../services/adminApi";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FeeData = any;

const FeesPage = () => {
  const [data, setData] = useState<FeeData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("");
  const [pathFilter, setPathFilter] = useState("");

  useEffect(() => {
    adminApi
      .getFees()
      .then(setData)
      .catch((err) => console.error("Failed to load fees:", err))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredData = data.filter((fee) => {
    if (statusFilter && fee.status !== statusFilter) return false;
    if (pathFilter && fee.type !== pathFilter) return false;
    if (
      search &&
      !(fee.id || "").toLowerCase().includes(search.toLowerCase()) &&
      !(fee.matchId || "").toLowerCase().includes(search.toLowerCase()) &&
      !(fee.renterName || "").toLowerCase().includes(search.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const columns: Column<FeeData>[] = [
    {
      header: "Fee ID / Match",
      cell: (row) => (
        <div className="flex flex-col">
          <span className="font-medium text-slate-900 font-mono text-xs">{String(row.id).substring(0, 8)}…</span>
          <span className="text-xs text-slate-500">{row.matchId}</span>
        </div>
      ),
    },
    {
      header: "Renter",
      cell: (row) => (
        <span className="text-sm font-medium text-slate-900">{row.renterName}</span>
      ),
    },
    {
      header: "Fee Path",
      cell: (row) => (
        <span className="text-xs font-semibold py-1 px-2 rounded bg-slate-100 text-slate-700 capitalize">
          {(row.type || "").replace("_", " ")}
        </span>
      ),
    },
    {
      header: "Onukpa Fee",
      cell: (row) => <span className="font-semibold text-emerald-700">{row.amount}</span>,
    },
    {
      header: "Status",
      cell: (row) => <StatusBadge kind="fee" status={row.status} />,
    },
    { header: "Date", accessorKey: "dueDate" },
    {
      header: "Actions",
      cell: () => (
        <button className="p-1.5 text-slate-400 hover:text-primary bg-slate-50 hover:bg-primary/10 rounded-lg transition-colors">
          <Eye className="w-4 h-4" />
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl md:text-2xl font-semibold text-slate-900 mb-1">Fees & Revenue</h2>
          <p className="text-sm md:text-base text-slate-600">
            Track generated fees and payment status.
          </p>
        </div>
        {data.length > 0 && (
          <div className="flex items-center gap-4 bg-emerald-50 border border-emerald-100 p-3 rounded-xl">
            <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
              <HandCoins className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-emerald-800 uppercase tracking-widest">Total Fees</p>
              <p className="text-lg font-bold text-emerald-900 leading-none mt-1">{data.length} records</p>
            </div>
          </div>
        )}
      </div>

      <FilterBar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search IDs or renters..."
        filters={[
          {
            label: "All Statuses",
            value: statusFilter,
            onChange: setStatusFilter,
            options: [
              { value: "not_due", label: "Not due" },
              { value: "pending", label: "Pending" },
              { value: "partially_paid", label: "Partially paid" },
              { value: "paid", label: "Paid" },
              { value: "disputed", label: "Disputed" },
              { value: "waived", label: "Waived" },
            ],
          },
          {
            label: "All Paths",
            value: pathFilter,
            onChange: setPathFilter,
            options: [
              { value: "landlord_direct", label: "Landlord direct" },
              { value: "agent_fallback", label: "Agent fallback" },
            ],
          },
        ]}
      />

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      ) : data.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 flex flex-col items-center justify-center text-center space-y-3">
          <Inbox className="w-10 h-10 text-slate-300" />
          <h3 className="text-sm font-semibold text-slate-700">No fee records yet</h3>
          <p className="text-xs text-slate-500 max-w-sm">
            Fee records are generated when a confirmed deal creates a revenue event. This section will populate as deals close on the platform.
          </p>
        </div>
      ) : (
        <DataTable data={filteredData} columns={columns} isLoading={false} />
      )}
    </div>
  );
};

export default FeesPage;
