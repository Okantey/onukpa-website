import { useState, useEffect } from "react";
import { Eye, HandCoins } from "lucide-react";
import DataTable from "../components/DataTable";
import type { Column } from "../components/DataTable";
import FilterBar from "../components/FilterBar";
import StatusBadge from "../components/StatusBadge";
import type { FeeStatus } from "../../constants/admin";

interface FeeData {
  id: string;
  matchId: string;
  renterName: string;
  supplierName: string;
  feePath: "landlord_direct" | "agent_assisted";
  rentValue: string;
  onukpaFeeAmount: string;
  status: FeeStatus;
  updatedAt: string;
}

const mockFees: FeeData[] = [
  {
    id: "FEE-401",
    matchId: "MTC-302",
    renterName: "Kwame Mensah",
    supplierName: "Mr. Addo",
    feePath: "landlord_direct",
    rentValue: "GHS 1,200/mo (12mo)",
    onukpaFeeAmount: "GHS 720", // 5%
    status: "pending",
    updatedAt: "2026-03-15",
  },
  {
    id: "FEE-402",
    matchId: "MTC-299",
    renterName: "Sarah Baah",
    supplierName: "Pro Agent Ghana",
    feePath: "agent_assisted",
    rentValue: "GHS 4,500/mo (6mo)",
    onukpaFeeAmount: "GHS 810", // 3%
    status: "paid",
    updatedAt: "2026-03-14",
  },
];

const FeesPage = () => {
  const [data, setData] = useState<FeeData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("");
  const [pathFilter, setPathFilter] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setData(mockFees);
      setIsLoading(false);
    }, 600);
  }, []);

  const filteredData = data.filter((fee) => {
    if (statusFilter && fee.status !== statusFilter) return false;
    if (pathFilter && fee.feePath !== pathFilter) return false;
    if (
      search &&
      !fee.id.toLowerCase().includes(search.toLowerCase()) &&
      !fee.matchId.toLowerCase().includes(search.toLowerCase()) &&
      !fee.renterName.toLowerCase().includes(search.toLowerCase())
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
          <span className="font-medium text-slate-900">{row.id}</span>
          <span className="text-xs text-slate-500 underline cursor-pointer hover:text-primary">
            {row.matchId}
          </span>
        </div>
      ),
    },
    {
      header: "Entities",
      cell: (row) => (
        <div className="flex flex-col text-sm">
          <span className="text-slate-900 font-medium">{row.renterName}</span>
          <span className="text-xs text-slate-500">to {row.supplierName}</span>
        </div>
      ),
    },
    {
      header: "Fee Path",
      cell: (row) => (
        <span className="text-xs font-semibold py-1 px-2 rounded bg-slate-100 text-slate-700 capitalize">
          {row.feePath.replace("_", " ")}
        </span>
      ),
    },
    { header: "Rent Value", accessorKey: "rentValue" },
    {
      header: "Onukpa Fee",
      cell: (row) => <span className="font-semibold text-emerald-700">{row.onukpaFeeAmount}</span>,
    },
    {
      header: "Status",
      cell: (row) => <StatusBadge kind="fee" status={row.status} />,
    },
    { header: "Updated", accessorKey: "updatedAt" },
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
        <div className="flex items-center gap-4 bg-emerald-50 border border-emerald-100 p-3 rounded-xl">
          <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
            <HandCoins className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-emerald-800 uppercase tracking-widest">Pending Collection</p>
            <p className="text-lg font-bold text-emerald-900 leading-none mt-1">GHS 18,400</p>
          </div>
        </div>
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
              { value: "pending", label: "Pending" },
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
              { value: "landlord_direct", label: "Landlord Direct (5%)" },
              { value: "agent_assisted", label: "Agent Assisted (3%)" },
            ],
          },
        ]}
      />

      <DataTable data={filteredData} columns={columns} isLoading={isLoading} />
    </div>
  );
};

export default FeesPage;
