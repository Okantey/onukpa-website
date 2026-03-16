import { useState, useEffect } from "react";
import { Eye, FileText, CheckCircle, Inbox } from "lucide-react";
import DataTable from "../components/DataTable";
import type { Column } from "../components/DataTable";
import FilterBar from "../components/FilterBar";
import StatusBadge from "../components/StatusBadge";
import DetailDrawer from "../components/DetailDrawer";
import { adminApi } from "../services/adminApi";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RequestData = any;

const RequestsPage = () => {
  const [data, setData] = useState<RequestData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<RequestData | null>(null);

  // Filters
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  useEffect(() => {
    adminApi
      .getRequests()
      .then(setData)
      .catch((err) => console.error("Failed to load requests:", err))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredData = data.filter((req) => {
    if (statusFilter && req.status !== statusFilter) return false;
    if (typeFilter && req.type !== typeFilter) return false;
    if (
      search &&
      !(req.id || "").toLowerCase().includes(search.toLowerCase()) &&
      !(req.renterName || "").toLowerCase().includes(search.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const columns: Column<RequestData>[] = [
    {
      header: "Request ID",
      cell: (row) => <span className="font-medium text-slate-900 font-mono text-xs">{String(row.id).substring(0, 8)}…</span>,
    },
    {
      header: "Type",
      accessorKey: "type",
    },
    {
      header: "User",
      cell: (row) => (
        <div className="flex flex-col">
          <span className="text-slate-900 font-medium">{row.renterName}</span>
          <span className="text-xs text-slate-500">{row.phone}</span>
        </div>
      ),
    },
    { header: "Budget", accessorKey: "budget" },
    { header: "Urgency", accessorKey: "urgency" },
    {
      header: "Status",
      cell: (row) => <StatusBadge kind="request" status={row.status} />,
    },
    { header: "Created", accessorKey: "date" },
    {
      header: "Actions",
      cell: (row) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedRequest(row);
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
        <h2 className="text-xl md:text-2xl font-semibold text-slate-900 mb-1">Requests</h2>
        <p className="text-sm md:text-base text-slate-600">
          Manage operational pipeline for renter demand.
        </p>
      </div>

      <FilterBar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search request ID or user..."
        filters={[
          {
            label: "All Types",
            value: typeFilter,
            onChange: setTypeFilter,
            options: [
              { value: "Rooms", label: "Rooms" },
              { value: "Apartments", label: "Apartments" },
              { value: "CampusHostels", label: "Hostels" },
            ],
          },
          {
            label: "All Statuses",
            value: statusFilter,
            onChange: setStatusFilter,
            options: [
              { value: "active", label: "Active" },
              { value: "pending", label: "Pending" },
              { value: "closed", label: "Closed" },
              { value: "expired", label: "Expired" },
            ],
          },
        ]}
      />

      <DataTable
        data={filteredData}
        columns={columns}
        isLoading={isLoading}
        onRowClick={(row) => setSelectedRequest(row)}
        emptyMessage="No requests found. Requests from the WhatsApp bot will appear here."
      />

      <DetailDrawer
        isOpen={!!selectedRequest}
        onClose={() => setSelectedRequest(null)}
        title={`Request ${String(selectedRequest?.id || "").substring(0, 8)}`}
        subtitle={`Submitted on ${selectedRequest?.date}`}
        actions={
          <>
            <button className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50">
              Cancel Request
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 shadow-sm flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Assign Property
            </button>
          </>
        }
      >
        {selectedRequest && (
          <div className="space-y-8">
            {/* Status overview */}
            <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <div>
                <p className="text-xs text-slate-500 font-medium">Current Status</p>
                <div className="mt-1">
                  <StatusBadge kind="request" status={selectedRequest.status} />
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500 font-medium">Urgency</p>
                <p className="text-sm font-semibold text-slate-900 mt-1">
                  {selectedRequest.urgency || "N/A"}
                </p>
              </div>
            </div>

            {/* Criteria section */}
            <section>
              <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2 mb-4">
                <FileText className="w-4 h-4 text-slate-400" />
                Request Criteria
              </h3>
              <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
                <div>
                  <span className="block text-xs text-slate-500">Property Type</span>
                  <span className="font-medium text-slate-900">{selectedRequest.type}</span>
                </div>
                <div>
                  <span className="block text-xs text-slate-500">Budget</span>
                  <span className="font-medium text-slate-900">{selectedRequest.budget}</span>
                </div>
              </div>
            </section>

            <hr className="border-slate-200" />

            {/* User section */}
            <section>
              <h3 className="text-sm font-semibold text-slate-900 mb-4">User Contact</h3>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <p className="font-medium text-slate-900">{selectedRequest.renterName}</p>
                <p className="text-slate-600 mt-1">📱 {selectedRequest.phone}</p>
              </div>
            </section>

            {/* Admin notes */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-slate-900">Internal Notes</h3>
              </div>
              <div className="p-4 rounded-xl border border-dashed border-slate-300 bg-slate-50/50 text-slate-500 text-sm text-center flex flex-col items-center gap-2">
                <Inbox className="w-5 h-5 opacity-50" />
                No notes added yet.
              </div>
            </section>
          </div>
        )}
      </DetailDrawer>
    </div>
  );
};

export default RequestsPage;
