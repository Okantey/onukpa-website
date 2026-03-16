import { useState, useEffect } from "react";
import { Eye, CheckCircle2, Inbox } from "lucide-react";
import DataTable from "../components/DataTable";
import type { Column } from "../components/DataTable";
import FilterBar from "../components/FilterBar";
import StatusBadge from "../components/StatusBadge";
import DetailDrawer from "../components/DetailDrawer";
import { adminApi } from "../services/adminApi";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MatchData = any;

const MatchesPage = () => {
  const [data, setData] = useState<MatchData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedMatch, setSelectedMatch] = useState<MatchData | null>(null);

  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    adminApi
      .getMatches()
      .then(setData)
      .catch((err) => console.error("Failed to load matches:", err))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredData = data.filter((mtc) => {
    if (statusFilter && mtc.status !== statusFilter) return false;
    if (
      search &&
      !(mtc.id || "").toLowerCase().includes(search.toLowerCase()) &&
      !(mtc.renterName || "").toLowerCase().includes(search.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const columns: Column<MatchData>[] = [
    {
      header: "Match ID",
      cell: (row) => <span className="font-medium text-slate-900 font-mono text-xs">{String(row.id).substring(0, 8)}…</span>,
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
    { header: "Renter", cell: (row) => <span className="font-medium">{row.renterName}</span> },
    {
      header: "Supplier",
      cell: (row) => (
        <div className="flex flex-col">
          <span className="text-slate-900">{row.supplierName}</span>
          <span className="text-[10px] uppercase text-slate-500 font-semibold">{row.supplierType}</span>
        </div>
      ),
    },
    {
      header: "Status",
      cell: (row) => <StatusBadge kind="match" status={row.status} />,
    },
    {
      header: "Actions",
      cell: (row) => (
        <button
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
          Track the connection lifecycle between renters and properties.
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
              { value: "interested", label: "Interested" },
              { value: "connected", label: "Connected" },
              { value: "viewing_scheduled", label: "Viewing" },
              { value: "negotiation", label: "Negotiation" },
              { value: "confirmed", label: "Deals Confirmed" },
              { value: "lost", label: "Lost" },
            ],
          },
        ]}
      />

      {data.length === 0 && !isLoading ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 flex flex-col items-center justify-center text-center space-y-3">
          <Inbox className="w-10 h-10 text-slate-300" />
          <h3 className="text-sm font-semibold text-slate-700">No matches yet</h3>
          <p className="text-xs text-slate-500 max-w-sm">
            Matches are created when a renter request is connected to a property or agent.
            This section will populate as the WhatsApp bot processes requests.
          </p>
        </div>
      ) : (
        <DataTable
          data={filteredData}
          columns={columns}
          isLoading={isLoading}
          onRowClick={(row) => setSelectedMatch(row)}
          emptyMessage="No matches found."
        />
      )}

      <DetailDrawer
        isOpen={!!selectedMatch}
        onClose={() => setSelectedMatch(null)}
        title={selectedMatch?.id || "Match Detail"}
        subtitle={`Last Updated ${selectedMatch?.updatedAt || "N/A"}`}
        actions={
          <>
            <button className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50">
              Mark as Lost
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 shadow-sm flex items-center gap-2">
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
                  <StatusBadge kind="match" status={selectedMatch.status} />
                </div>
              </div>
            </div>

            <section>
              <h3 className="text-sm font-semibold text-slate-900 mb-4">Entities</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-white p-4 border border-slate-200 rounded-xl shadow-sm">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Renter</p>
                  <p className="text-sm font-medium text-slate-900">{selectedMatch.renterName}</p>
                </div>
                <div className="bg-white p-4 border border-slate-200 rounded-xl shadow-sm">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Supplier</p>
                  <p className="text-sm font-medium text-slate-900">{selectedMatch.supplierName}</p>
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
