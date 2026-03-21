import { useEffect, useState } from "react";
import { Inbox, Loader2, AlertCircle } from "lucide-react";
import { listAuditEvents } from "../services/auditApi";
import type { AuditEventRow } from "../services/adminTypes";

const AuditPage = () => {
  const [rows, setRows] = useState<AuditEventRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    listAuditEvents(150)
      .then(setRows)
      .catch((e: Error) => setError(e.message || "Failed to load audit log"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl md:text-2xl font-semibold text-slate-900 mb-1">Audit Log</h2>
        <p className="text-sm md:text-base text-slate-600">
          Events written by the bot and services (`AuditEvent` collection).
        </p>
      </div>

      {loading && (
        <div className="flex justify-center py-16">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 text-rose-600 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          {error}
        </div>
      )}

      {!loading && !error && rows.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 flex flex-col items-center justify-center text-center space-y-3">
          <Inbox className="w-10 h-10 text-slate-300" />
          <h3 className="text-sm font-semibold text-slate-700">No audit events yet</h3>
          <p className="text-xs text-slate-500 max-w-md">
            When the bot broadcasts to agents, records fees, or other code calls `logEvent`, rows appear here.
          </p>
        </div>
      )}

      {!loading && !error && rows.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide">
                <tr>
                  <th className="px-4 py-3">When</th>
                  <th className="px-4 py-3">Event</th>
                  <th className="px-4 py-3">Entity</th>
                  <th className="px-4 py-3">Actor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.map((ev) => (
                  <tr key={ev._id} className="hover:bg-slate-50/80">
                    <td className="px-4 py-3 text-slate-600 whitespace-nowrap">
                      {ev.createdAt
                        ? new Date(ev.createdAt).toLocaleString()
                        : "—"}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-900">{ev.eventType}</td>
                    <td className="px-4 py-3 text-slate-700">
                      <span className="font-medium">{ev.entityType}</span>
                      <span className="text-slate-400 text-xs ml-1 font-mono">
                        {String(ev.entityId).substring(0, 8)}…
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{ev.actorType}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuditPage;
