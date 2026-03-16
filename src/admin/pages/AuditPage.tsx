import { useState, useEffect } from "react";
import DataTable from "../components/DataTable";
import type { Column } from "../components/DataTable";

interface AuditEvent {
  timestamp: string;
  entityType: string;
  entityId: string;
  eventType: string;
  actor: string;
  summary: string;
}

const mockEvents: AuditEvent[] = [
  {
    timestamp: "2026-03-15 10:42 PM",
    entityType: "Property",
    entityId: "PROP-102",
    eventType: "status.changed",
    actor: "System",
    summary: "Status updated to approved_live",
  },
  {
    timestamp: "2026-03-15 10:15 PM",
    entityType: "Request",
    entityId: "REQ-002",
    eventType: "match.created",
    actor: "Admin (OA)",
    summary: "Matched REQ-002 to PROP-102",
  },
  {
    timestamp: "2026-03-15 09:30 AM",
    entityType: "Supplier",
    entityId: "SUP-202",
    eventType: "supplier.registered",
    actor: "User (Web)",
    summary: "Pro Agent Ghana joined as agent",
  },
];

const AuditPage = () => {
  const [data, setData] = useState<AuditEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setData(mockEvents);
      setIsLoading(false);
    }, 600);
  }, []);

  const columns: Column<AuditEvent>[] = [
    {
      header: "Timestamp",
      cell: (row) => <span className="text-xs text-slate-500">{row.timestamp}</span>,
    },
    {
      header: "Event",
      cell: (row) => (
        <span className="inline-flex px-2 py-0.5 rounded text-[11px] font-mono bg-slate-100 text-slate-700 border border-slate-200">
          {row.eventType}
        </span>
      ),
    },
    {
      header: "Entity",
      cell: (row) => (
        <span className="text-sm font-medium text-slate-900">
          {row.entityType} ({row.entityId})
        </span>
      ),
    },
    { header: "Summary", accessorKey: "summary", className: "text-slate-600" },
    {
      header: "Actor",
      cell: (row) => (
        <span className="text-xs px-2 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-700">
          {row.actor}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl md:text-2xl font-semibold text-slate-900 mb-1">Audit Log</h2>
        <p className="text-sm md:text-base text-slate-600">
          Immutable history of operational actions.
        </p>
      </div>

      <DataTable data={data} columns={columns} isLoading={isLoading} />
    </div>
  );
};

export default AuditPage;
