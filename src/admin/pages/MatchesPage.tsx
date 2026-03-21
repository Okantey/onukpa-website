import { useState, useEffect } from "react";
import { Eye, CheckCircle2 } from "lucide-react";
import DataTable from "../components/DataTable";
import type { Column } from "../components/DataTable";
import FilterBar from "../components/FilterBar";
import StatusBadge from "../components/StatusBadge";
import DetailDrawer from "../components/DetailDrawer";
import { adminApi } from "../services/adminApi";
import type { MatchStatus } from "../../constants/admin";

type MatchData = Record<string, unknown> & {
  id: string;
  requestId: string;
  propertyId: string;
  renterName: string;
  supplierName: string;
  supplierType: string;
  status: string;
  sourcePriority?: string;
  updatedAt: string;
};

const MatchesPage = () => {
  const [data, setData] = useState<MatchData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedMatch, setSelectedMatch] = useState<MatchData | null>(null);
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    adminApi
      .getMatches()
      .then((rows) => setData(rows as MatchData[]))
      .catch((err) => console.error("Failed to load matches:", err))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredData = data.filter((mtc) => {
    if (statusFilter && mtc.status !== statusFilter) return false;
    if (
      search &&
      !(String(mtc.id) || "").toLowerCase().includes(search.toLowerCase()) &&
      !(mtc.renterName || "").toLowerCase().includes(search.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const columns: Column<MatchData>[] = [
    {
      header: "Match ID",
      cell: (row) => (
        <span className="font-medium text-slate-900 font-mono text-xs">
          {String(row.id).substring(0, 8)}…
        </span>
      ),
    },
    {
      header: "Request / Prop",
      cell: (row) => (
        <div className="flex flex-col text-xs text-slate-700">
          <span>{row.requestId}</span>
          <span>{row.propertyId}</span>
        </div>
      ),
    },
    {
      header: "Renter",
      cell: (row) => <span className="font-medium">{row.renterName}</span>,
    },
    {
      header: "Supplier",
      cell: (row) => (
        <div className="flex flex-col">
          <span className="text-slate-900">{row.supplierName}</span>
          <span className="text-[10px] uppercase text-slate-500 font-semibold">
            {row.supplierType}
          </span>
        </div>
      ),
    },
    {
      header: "Source",
      cell: (row) => (
        <span className="text-[10px] font-mono text-slate-600">
          {(row.sourcePriority as string) || "—"}
        </span>
      ),
    },
    {
      header: "Status",
      cell: (row) => (
        <StatusBadge kind="match" status={row.status as MatchStatus} />
      ),
    },
    {
      header: "Actions",
      cell: (row) => (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setSelectedMatch(row);
          }}
          className="p-1.5 text-slate-400 hover:text-primary bg-slate-50 hover:bg-primary/10 rounded-lg transition-colors"
        >
          <Eye className="w-4 h-4" />
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl md:text-2xl font-semibold text-slate-900 mb-1">Matches</h2>
        <p className="text-sm md:text-base text-slate-600">
          Match candidates from landlord listings, agent listings, and agent fallback broadcasts.
        </p>
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
              { value: "shown_to_renter", label: "Shown to renter" },
              { value: "supplier_notified", label: "Supplier notified" },
              { value: "connected", label: "Connected" },
              { value: "clicked_interested", label: "Clicked interested" },
              { value: "expired", label: "Expired" },
              { value: "dismissed", label: "Dismissed" },
            ],
          },
        ]}
      />

      <DataTable
        data={filteredData}
        columns={columns}
        isLoading={isLoading}
        onRowClick={(row) => setSelectedMatch(row)}
        emptyMessage="No match candidates yet. Run a renter search or agent broadcast from the bot."
      />

      <DetailDrawer
        isOpen={!!selectedMatch}
        onClose={() => setSelectedMatch(null)}
        title={selectedMatch ? String(selectedMatch.id).substring(0, 12) + "…" : "Match Detail"}
        subtitle={`Last updated ${selectedMatch?.updatedAt || "N/A"}`}
        actions={
          <>
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
            >
              Mark as Lost
            </button>
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 shadow-sm flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              Confirm Deal
            </button>
          </>
        }
      >
        {selectedMatch && (
          <div className="space-y-8">
            <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <div>
                <p className="text-xs text-slate-500 font-medium">Match Status</p>
                <div className="mt-1">
                  <StatusBadge
                    kind="match"
                    status={selectedMatch.status as MatchStatus}
                  />
                </div>
              </div>
            </div>

            <section>
              <h3 className="text-sm font-semibold text-slate-900 mb-4">Entities</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-white p-4 border border-slate-200 rounded-xl shadow-sm">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    Renter
                  </p>
                  <p className="text-sm font-medium text-slate-900">
                    {selectedMatch.renterName}
                  </p>
                </div>
                <div className="bg-white p-4 border border-slate-200 rounded-xl shadow-sm">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    Supplier
                  </p>
                  <p className="text-sm font-medium text-slate-900">
                    {selectedMatch.supplierName}
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}
      </DetailDrawer>
    </div>
  );
};

export default MatchesPage;
