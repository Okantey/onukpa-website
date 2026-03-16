import { Inbox } from "lucide-react";

const AuditPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl md:text-2xl font-semibold text-slate-900 mb-1">Audit Log</h2>
        <p className="text-sm md:text-base text-slate-600">
          Immutable history of operational actions.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 flex flex-col items-center justify-center text-center space-y-3">
        <Inbox className="w-10 h-10 text-slate-300" />
        <h3 className="text-sm font-semibold text-slate-700">No audit events recorded yet</h3>
        <p className="text-xs text-slate-500 max-w-sm">
          Audit events will be logged as admin actions like property approvals, supplier verifications, and fee updates are performed through the console.
        </p>
      </div>
    </div>
  );
};

export default AuditPage;
