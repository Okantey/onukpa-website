import type { ReactNode } from "react";
import type {
  RequestStatus,
  PropertyStatus,
  SupplierType,
  MatchStatus,
  FeeStatus,
} from "../../constants/admin";

type StatusKind = "request" | "property" | "supplier" | "match" | "fee";

type Props =
  | { kind: "request"; status: RequestStatus }
  | { kind: "property"; status: PropertyStatus }
  | { kind: "supplier"; status: SupplierType | "pending_review" | "verified" | "rejected" | "suspended" | "started" | "bio_completed" }
  | { kind: "match"; status: MatchStatus }
  | { kind: "fee"; status: FeeStatus };

const baseClasses =
  "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border";

const styles: Record<
  StatusKind,
  Record<string, { label: string; className: string }>
> = {
  request: {
    pending: { label: "Pending", className: "bg-amber-50 text-amber-800 border-amber-200" },
    searching: { label: "Searching", className: "bg-sky-50 text-sky-800 border-sky-200" },
    property_found: { label: "Property Found", className: "bg-emerald-50 text-emerald-800 border-emerald-200" },
    interested: { label: "Interested", className: "bg-primary/10 text-primary border-primary/20" },
    connected: { label: "Connected", className: "bg-indigo-50 text-indigo-800 border-indigo-200" },
    deal_confirmed: { label: "Deal Confirmed", className: "bg-emerald-100 text-emerald-900 border-emerald-200" },
    fee_pending: { label: "Fee Pending", className: "bg-orange-50 text-orange-800 border-orange-200" },
    completed: { label: "Completed", className: "bg-slate-100 text-slate-800 border-slate-200" },
    cancelled: { label: "Cancelled", className: "bg-rose-50 text-rose-800 border-rose-200" },
    expired: { label: "Expired", className: "bg-slate-50 text-slate-500 border-slate-200" },
  },
  property: {
    draft: { label: "Draft", className: "bg-slate-50 text-slate-700 border-slate-200" },
    submitted: { label: "Submitted", className: "bg-sky-50 text-sky-800 border-sky-200" },
    under_review: { label: "Under Review", className: "bg-amber-50 text-amber-800 border-amber-200" },
    approved_live: { label: "Live", className: "bg-emerald-50 text-emerald-800 border-emerald-200" },
    rejected: { label: "Rejected", className: "bg-rose-50 text-rose-800 border-rose-200" },
    paused: { label: "Paused", className: "bg-slate-100 text-slate-700 border-slate-200" },
    expired: { label: "Expired", className: "bg-slate-50 text-slate-500 border-slate-200" },
    rented_closed: { label: "Rented / Closed", className: "bg-indigo-50 text-indigo-800 border-indigo-200" },
    archived: { label: "Archived", className: "bg-slate-50 text-slate-400 border-slate-200" },
  },
  supplier: {
    landlord: { label: "Landlord", className: "bg-primary/10 text-primary border-primary/20" },
    agent: { label: "Agent", className: "bg-sky-50 text-sky-800 border-sky-200" },
    started: { label: "Started", className: "bg-slate-50 text-slate-600 border-slate-200" },
    bio_completed: { label: "Bio Completed", className: "bg-slate-50 text-slate-700 border-slate-200" },
    pending_review: { label: "Pending Review", className: "bg-amber-50 text-amber-800 border-amber-200" },
    verified: { label: "Verified", className: "bg-emerald-50 text-emerald-800 border-emerald-200" },
    rejected: { label: "Rejected", className: "bg-rose-50 text-rose-800 border-rose-200" },
    suspended: { label: "Suspended", className: "bg-slate-900 text-slate-100 border-slate-800" },
  },
  match: {
    generated: { label: "Generated", className: "bg-slate-50 text-slate-700 border-slate-200" },
    shown: { label: "Shown to Renter", className: "bg-sky-50 text-sky-800 border-sky-200" },
    interested: { label: "Interested", className: "bg-primary/10 text-primary border-primary/20" },
    supplier_notified: { label: "Supplier Notified", className: "bg-amber-50 text-amber-800 border-amber-200" },
    connected: { label: "Connected", className: "bg-indigo-50 text-indigo-800 border-indigo-200" },
    viewing_scheduled: { label: "Viewing Scheduled", className: "bg-emerald-50 text-emerald-800 border-emerald-200" },
    negotiation: { label: "Negotiation", className: "bg-slate-50 text-slate-700 border-slate-200" },
    confirmed: { label: "Confirmed", className: "bg-emerald-100 text-emerald-900 border-emerald-200" },
    lost: { label: "Lost", className: "bg-rose-50 text-rose-800 border-rose-200" },
  },
  fee: {
    not_due: { label: "Not Due", className: "bg-slate-50 text-slate-600 border-slate-200" },
    pending: { label: "Pending", className: "bg-amber-50 text-amber-800 border-amber-200" },
    partially_paid: { label: "Partially Paid", className: "bg-sky-50 text-sky-800 border-sky-200" },
    paid: { label: "Paid", className: "bg-emerald-50 text-emerald-800 border-emerald-200" },
    disputed: { label: "Disputed", className: "bg-rose-50 text-rose-800 border-rose-200" },
    waived: { label: "Waived", className: "bg-slate-100 text-slate-700 border-slate-200" },
  },
};

function StatusBadge(props: Props): ReactNode {
  const kind = props.kind as StatusKind;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const statusKey = (props as any).status as string;
  const map = styles[kind];
  const conf = map[statusKey] || {
    label: statusKey,
    className: "bg-slate-50 text-slate-600 border-slate-200",
  };

  return (
    <span className={`${baseClasses} ${conf.className}`}>
      {conf.label}
    </span>
  );
}

export default StatusBadge;

