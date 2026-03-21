import { useState, useEffect, useCallback } from "react";
import { Eye, FileText, CheckCircle, Loader2, Link2, Copy } from "lucide-react";
import DataTable from "../components/DataTable";
import type { Column } from "../components/DataTable";
import FilterBar from "../components/FilterBar";
import StatusBadge from "../components/StatusBadge";
import DetailDrawer from "../components/DetailDrawer";
import { adminApi } from "../services/adminApi";
import { patchAdminRequest } from "../services/requestsApi";
import { listProperties } from "../services/propertiesApi";
import { postAdminManualAssign } from "../services/matchesApi";
import { REQUEST_STATUSES, type RequestStatus } from "../../constants/admin";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RequestData = any;

type LiveOption = { id: string; label: string };

const RequestsPage = () => {
  const [data, setData] = useState<RequestData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<RequestData | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const [notesDraft, setNotesDraft] = useState("");
  const [notesSaving, setNotesSaving] = useState(false);

  const [assignOpen, setAssignOpen] = useState(false);
  const [liveOptions, setLiveOptions] = useState<LiveOption[]>([]);
  const [assignListLoading, setAssignListLoading] = useState(false);
  const [assignPropertyId, setAssignPropertyId] = useState("");
  const [assignBusy, setAssignBusy] = useState(false);
  const [assignResultLink, setAssignResultLink] = useState<string | null>(null);

  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const reload = useCallback(async () => {
    const list = await adminApi.getRequests();
    setData(list);
    setSelectedRequest((prev) => {
      if (!prev) return null;
      const id = String(prev.id ?? prev._id ?? "");
      return list.find((r: RequestData) => String(r.id ?? r._id) === id) ?? null;
    });
  }, []);

  useEffect(() => {
    reload()
      .catch((err) => console.error("Failed to load requests:", err))
      .finally(() => setIsLoading(false));
  }, [reload]);

  useEffect(() => {
    setActionError(null);
    setAssignOpen(false);
    setAssignResultLink(null);
    setAssignPropertyId("");
    setLiveOptions([]);
    const n = selectedRequest?.adminNotes;
    setNotesDraft(typeof n === "string" ? n : "");
  }, [selectedRequest?.id]);

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
      cell: (row) => (
        <span className="font-medium text-slate-900 font-mono text-xs">
          {String(row.id).substring(0, 8)}…
        </span>
      ),
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
      cell: (row) => (
        <StatusBadge kind="request" status={row.status as RequestStatus} />
      ),
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

  const selectedId = selectedRequest
    ? String(selectedRequest.id ?? selectedRequest._id ?? "")
    : "";
  const reqStatus = selectedRequest ? String(selectedRequest.status) : "";
  const requestClosed = ["cancelled", "expired", "completed"].includes(reqStatus);
  const canCancel = selectedRequest && !requestClosed;
  const canAssign = selectedRequest && !requestClosed;

  const handleCancel = async () => {
    if (!selectedId) return;
    setActionLoading(true);
    setActionError(null);
    try {
      await patchAdminRequest(selectedId, { status: "cancelled" });
      await reload();
    } catch (e) {
      setActionError(e instanceof Error ? e.message : "Cancel failed");
    } finally {
      setActionLoading(false);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedId) return;
    setNotesSaving(true);
    setActionError(null);
    try {
      await patchAdminRequest(selectedId, { adminNotes: notesDraft });
      await reload();
    } catch (e) {
      setActionError(e instanceof Error ? e.message : "Could not save notes");
    } finally {
      setNotesSaving(false);
    }
  };

  const openAssignPanel = async () => {
    setAssignOpen(true);
    setAssignResultLink(null);
    setAssignPropertyId("");
    setAssignListLoading(true);
    setActionError(null);
    try {
      const docs = await listProperties();
      const live = docs
        .filter((d: Record<string, unknown>) => d.listingStatus === "approved_live")
        .map((d: Record<string, unknown>) => {
          const id = String(d._id ?? "");
          const title = String(d.title ?? "Untitled");
          const area = String(d.area ?? "");
          return {
            id,
            label: `${title} — ${area} (${id.slice(0, 8)}…)`,
          };
        });
      setLiveOptions(live);
    } catch (e) {
      setActionError(e instanceof Error ? e.message : "Could not load properties");
    } finally {
      setAssignListLoading(false);
    }
  };

  const handleManualAssign = async () => {
    if (!selectedId || !assignPropertyId) return;
    setAssignBusy(true);
    setActionError(null);
    try {
      const res = await postAdminManualAssign({
        renterRequestId: selectedId,
        propertyId: assignPropertyId,
      });
      setAssignResultLink(res.renterLink);
      await reload();
    } catch (e) {
      setActionError(e instanceof Error ? e.message : "Assignment failed");
    } finally {
      setAssignBusy(false);
    }
  };

  const copyLink = async () => {
    if (!assignResultLink || !navigator.clipboard?.writeText) return;
    await navigator.clipboard.writeText(assignResultLink);
  };

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
            options: REQUEST_STATUSES.map((s) => ({
              value: s,
              label: s.replace(/_/g, " "),
            })),
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
            <button
              type="button"
              disabled={!canCancel || actionLoading}
              onClick={() => void handleCancel()}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 flex items-center gap-2"
            >
              {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              Cancel Request
            </button>
            <button
              type="button"
              disabled={!canAssign}
              onClick={() => void openAssignPanel()}
              className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg shadow-sm hover:bg-primary/90 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <CheckCircle className="w-4 h-4" />
              Assign Property
            </button>
          </>
        }
      >
        {selectedRequest && (
          <div className="space-y-8">
            {actionError ? (
              <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                {actionError}
              </div>
            ) : null}

            {assignOpen ? (
              <section className="p-4 rounded-xl border border-primary/30 bg-primary/5 space-y-3">
                <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                  <Link2 className="w-4 h-4" />
                  Manual assign (live listing)
                </h3>
                <p className="text-xs text-slate-600">
                  Creates a match and sets the request to <strong>property_found</strong>. Share the
                  link with the renter (e.g. on WhatsApp). Interest tracking uses{" "}
                  <code className="text-[11px] bg-white px-1 rounded border">?m=</code>.
                </p>
                {assignListLoading ? (
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Loading live properties…
                  </div>
                ) : liveOptions.length === 0 ? (
                  <p className="text-sm text-amber-800">No approved live listings available.</p>
                ) : (
                  <>
                    <select
                      value={assignPropertyId}
                      onChange={(e) => {
                        setAssignPropertyId(e.target.value);
                        setAssignResultLink(null);
                      }}
                      className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white"
                    >
                      <option value="">Select a property…</option>
                      {liveOptions.map((o) => (
                        <option key={o.id} value={o.id}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      disabled={!assignPropertyId || assignBusy}
                      onClick={() => void handleManualAssign()}
                      className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {assignBusy ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                      Confirm assignment
                    </button>
                  </>
                )}
                {assignResultLink ? (
                  <div className="space-y-2 pt-2 border-t border-primary/20">
                    <p className="text-xs font-medium text-slate-700">Renter link (copy)</p>
                    <div className="flex gap-2">
                      <input
                        readOnly
                        value={assignResultLink}
                        className="flex-1 text-xs font-mono border border-slate-200 rounded-lg px-2 py-2 bg-white"
                      />
                      <button
                        type="button"
                        onClick={() => void copyLink()}
                        className="shrink-0 px-3 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 flex items-center gap-1 text-sm"
                      >
                        <Copy className="w-4 h-4" />
                        Copy
                      </button>
                    </div>
                  </div>
                ) : null}
              </section>
            ) : null}

            <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <div>
                <p className="text-xs text-slate-500 font-medium">Current Status</p>
                <div className="mt-1">
                  <StatusBadge
                    kind="request"
                    status={selectedRequest.status as RequestStatus}
                  />
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500 font-medium">Urgency</p>
                <p className="text-sm font-semibold text-slate-900 mt-1">
                  {selectedRequest.urgency || "N/A"}
                </p>
              </div>
            </div>

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

            <section>
              <h3 className="text-sm font-semibold text-slate-900 mb-4">User Contact</h3>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <p className="font-medium text-slate-900">{selectedRequest.renterName}</p>
                <p className="text-slate-600 mt-1">📱 {selectedRequest.phone}</p>
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-slate-900">Internal notes</h3>
                <button
                  type="button"
                  disabled={notesSaving}
                  onClick={() => void handleSaveNotes()}
                  className="text-xs font-medium text-primary hover:underline disabled:opacity-50"
                >
                  {notesSaving ? "Saving…" : "Save notes"}
                </button>
              </div>
              <textarea
                value={notesDraft}
                onChange={(e) => setNotesDraft(e.target.value)}
                rows={4}
                className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                placeholder="Visible to admins only. Not shown to renters."
              />
            </section>
          </div>
        )}
      </DetailDrawer>
    </div>
  );
};

export default RequestsPage;
