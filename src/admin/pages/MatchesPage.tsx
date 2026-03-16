import { useState, useEffect } from "react";
import { Eye, CheckCircle2 } from "lucide-react";
import DataTable from "../components/DataTable";
import type { Column } from "../components/DataTable";
import FilterBar from "../components/FilterBar";
import StatusBadge from "../components/StatusBadge";
import DetailDrawer from "../components/DetailDrawer";
import type { MatchStatus } from "../../constants/admin";

interface MatchData {
  id: string;
  requestId: string;
  propertyId: string;
  renterName: string;
  supplierName: string;
  supplierType: "landlord" | "agent";
  matchSource: "direct" | "fallback";
  status: MatchStatus;
  updatedAt: string;
}

const mockMatches: MatchData[] = [
  {
    id: "MTC-301",
    requestId: "REQ-002",
    propertyId: "PROP-102",
    renterName: "Ama Osei",
    supplierName: "Pro Agent Ghana",
    supplierType: "agent",
    matchSource: "fallback",
    status: "interested",
    updatedAt: "2026-03-14",
  },
  {
    id: "MTC-302",
    requestId: "REQ-001",
    propertyId: "PROP-101",
    renterName: "Kwame Mensah",
    supplierName: "Mr. Addo",
    supplierType: "landlord",
    matchSource: "direct",
    status: "viewing_scheduled",
    updatedAt: "2026-03-15",
  },
  {
    id: "MTC-303",
    requestId: "REQ-004",
    propertyId: "PROP-108",
    renterName: "Akosua Boahen",
    supplierName: "Abla Mensah",
    supplierType: "landlord",
    matchSource: "direct",
    status: "lost",
    updatedAt: "2026-03-10",
  },
];

const MatchesPage = () => {
  const [data, setData] = useState<MatchData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedMatch, setSelectedMatch] = useState<MatchData | null>(null);

  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setData(mockMatches);
      setIsLoading(false);
    }, 600);
  }, []);

  const filteredData = data.filter((mtc) => {
    if (statusFilter && mtc.status !== statusFilter) return false;
    if (
      search &&
      !mtc.id.toLowerCase().includes(search.toLowerCase()) &&
      !mtc.requestId.toLowerCase().includes(search.toLowerCase()) &&
      !mtc.renterName.toLowerCase().includes(search.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const columns: Column<MatchData>[] = [
    {
      header: "Match ID",
      accessorKey: "id",
      cell: (row) => <span className="font-medium text-slate-900">{row.id}</span>,
    },
    {
      header: "Request / Prop",
      cell: (row) => (
        <div className="flex flex-col text-xs text-slate-700 group-hover:text-primary transition-colors cursor-pointer underline decoration-slate-300">
          <span>{row.requestId}</span>
          <span>{row.propertyId}</span>
        </div>
      ),
    },
    { header: "Renter", accessorKey: "renterName", cell: (row) => <span className="font-medium">{row.renterName}</span> },
    {
      header: "Supplier",
      cell: (row) => (
        <div className="flex flex-col">
          <span className="text-slate-900">{row.supplierName}</span>
          <span className="text-[10px] uppercase text-slate-500 font-semibold">{row.supplierType} / {row.matchSource}</span>
        </div>
      ),
    },
    {
      header: "Status",
      cell: (row) => <StatusBadge kind="match" status={row.status} />,
    },
    { header: "Updated", accessorKey: "updatedAt" },
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

      <DataTable
        data={filteredData}
        columns={columns}
        isLoading={isLoading}
        onRowClick={(row) => setSelectedMatch(row)}
      />

      <DetailDrawer
        isOpen={!!selectedMatch}
        onClose={() => setSelectedMatch(null)}
        title={selectedMatch?.id || "Match Detail"}
        subtitle={`Last Updated ${selectedMatch?.updatedAt}`}
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
              <div className="text-right">
                <p className="text-xs text-slate-500 font-medium">Match Path</p>
                <p className="text-sm font-semibold text-slate-900 mt-1 capitalize">
                  {selectedMatch.matchSource}
                </p>
              </div>
            </div>

            <section>
              <h3 className="text-sm font-semibold text-slate-900 mb-4">Entities</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-white p-4 border border-slate-200 rounded-xl shadow-sm">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Renter</p>
                  <p className="text-sm font-medium text-slate-900">{selectedMatch.renterName}</p>
                  <p className="text-xs text-slate-500 mt-1">Req: {selectedMatch.requestId}</p>
                </div>
                <div className="bg-white p-4 border border-slate-200 rounded-xl shadow-sm">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Supplier</p>
                  <p className="text-sm font-medium text-slate-900">{selectedMatch.supplierName}</p>
                  <p className="text-xs text-slate-500 mt-1 capitalize">{selectedMatch.supplierType} • Prop: {selectedMatch.propertyId}</p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-sm font-semibold text-slate-900 mb-4">Lifecycle Events (Mock Timeline)</h3>
              <ol className="relative border-l border-slate-200 ml-3 space-y-6">
                <li className="pl-6">
                  <span className="absolute flex items-center justify-center w-6 h-6 bg-primary/10 rounded-full -left-3 ring-4 ring-white">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </span>
                  <h4 className="text-sm font-medium text-slate-900">Current: {selectedMatch.status.replace("_", " ")}</h4>
                  <p className="text-xs text-slate-500 mt-1">{selectedMatch.updatedAt}</p>
                </li>
                <li className="pl-6">
                  <span className="absolute flex items-center justify-center w-6 h-6 bg-slate-100 rounded-full -left-3 ring-4 ring-white">
                    <div className="w-2 h-2 rounded-full bg-slate-300" />
                  </span>
                  <h4 className="text-sm font-medium text-slate-900">Generated</h4>
                  <p className="text-xs text-slate-500 mt-1">Prior date</p>
                </li>
              </ol>
            </section>
          </div>
        )}
      </DetailDrawer>
    </div>
  );
};

export default MatchesPage;
