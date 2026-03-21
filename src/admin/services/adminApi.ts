import { fetchAnalytics } from "./analyticsApi";
import { listRenterRequests } from "./requestsApi";
import { listProperties } from "./propertiesApi";
import { listSuppliers } from "./suppliersApi";
import { listMatchCandidates } from "./matchesApi";
import { listFeeRecords } from "./feesApi";

export interface DashboardMetrics {
  totalRequests: number;
  activeRequests: number;
  pendingProperties: number;
  liveProperties: number;
  totalSuppliers: number;
  totalLandlords: number;
  totalAgents: number;
  matchesInProgress: number;
  dealsConfirmed: number;
  feesPending: number;
  feesCollected: number;
}

export interface RecentRequestRow {
  id: string;
  type: string;
  status: string;
  date: string;
  renterName: string;
  phone: string;
}

function mapSummaryToMetrics(s: {
  totalRequests: number;
  activeRequests: number;
  pendingReviewProperties: number;
  activeProperties: number;
  totalSuppliers: number;
  totalLandlords: number;
  totalAgents: number;
  matchCandidatesOpen: number;
  matchesConnected: number;
  feesPendingCount: number;
  totalRevenueGHS: number;
}): DashboardMetrics {
  return {
    totalRequests: s.totalRequests,
    activeRequests: s.activeRequests,
    pendingProperties: s.pendingReviewProperties,
    liveProperties: s.activeProperties,
    totalSuppliers: s.totalSuppliers,
    totalLandlords: s.totalLandlords,
    totalAgents: s.totalAgents,
    matchesInProgress: s.matchCandidatesOpen,
    dealsConfirmed: s.matchesConnected,
    feesPending: s.feesPendingCount,
    feesCollected: s.totalRevenueGHS,
  };
}

function mapRecentRequest(doc: Record<string, unknown>): RecentRequestRow {
  const user = doc.userId as { name?: string; phone?: string } | undefined;
  return {
    id: String(doc._id ?? ""),
    type: String(doc.requestType ?? ""),
    status: String(doc.status ?? "pending"),
    date: doc.createdAt ? new Date(doc.createdAt as string).toLocaleString() : "",
    renterName: user?.name || "Unknown",
    phone: user?.phone || "N/A",
  };
}

export async function getDashboardPayload(): Promise<{
  metrics: DashboardMetrics;
  recentRequests: RecentRequestRow[];
}> {
  const stats = await fetchAnalytics();
  return {
    metrics: mapSummaryToMetrics(stats.summary),
    recentRequests: (stats.recentActivity.latestRequests ?? []).map(mapRecentRequest),
  };
}

export const adminApi = {
  getOverviewMetrics: async (): Promise<DashboardMetrics> => {
    const stats = await fetchAnalytics();
    return mapSummaryToMetrics(stats.summary);
  },

  getRequests: async () => {
    const docs = await listRenterRequests();
    return docs.map((doc) => {
      const d = doc as Record<string, unknown>;
      const user = d.userId as { name?: string; phone?: string } | undefined;
      const criteria = d.searchCriteria as { budget?: string } | undefined;
      return {
        ...d,
        id: d._id,
        renterName: user?.name || "Unknown Renter",
        phone: user?.phone || "N/A",
        type: d.requestType,
        budget: criteria?.budget ? `GH₵ ${criteria.budget}` : "N/A",
        urgency: d.urgency != null ? String(d.urgency) : "N/A",
        date: d.createdAt ? new Date(d.createdAt as string).toLocaleDateString() : "",
        status: d.status != null ? String(d.status) : "pending",
      };
    });
  },

  getProperties: async () => {
    const docs = await listProperties();
    return docs.map((doc) => {
      const d = doc as Record<string, unknown>;
      const sp = d.supplierProfileId as
        | {
            userId?: { name?: string };
            companyName?: string;
            supplierType?: string;
          }
        | undefined;
      const supplierLabel =
        sp?.userId?.name ||
        (sp?.companyName ? String(sp.companyName) : null) ||
        "Unknown supplier";
      return {
        ...d,
        id: d._id,
        title: d.title || "Untitled Property",
        supplierName: supplierLabel,
        supplierType: sp?.supplierType,
        type: d.subType || d.propertyCategory,
        category: d.propertyCategory,
        price: `GH₵ ${d.monthlyEquivalent ?? 0}`,
        location: d.area || "Unknown",
        status: d.listingStatus,
        dateAdded: d.createdAt
          ? new Date(d.createdAt as string).toLocaleDateString()
          : "",
      };
    });
  },

  getSuppliers: async () => {
    const docs = await listSuppliers();
    return docs.map((doc) => {
      const d = doc as Record<string, unknown>;
      const user = d.userId as { name?: string; phone?: string } | undefined;
      return {
        ...d,
        id: d._id,
        name: (d.companyName as string) || user?.name || "Unknown",
        type: d.supplierType,
        phone: user?.phone || "N/A",
        status: d.verificationStatus,
        ghanaCardNumber: d.ghanaCardNumber != null ? String(d.ghanaCardNumber) : "",
        propertiesListed: 0,
        rating:
          d.ratingInternal != null ? String(d.ratingInternal) : "No rating",
        joinedDate: d.createdAt
          ? new Date(d.createdAt as string).toLocaleDateString()
          : "",
      };
    });
  },

  getMatches: async () => {
    const docs = await listMatchCandidates();
    return docs.map((doc) => {
      const d = doc as Record<string, unknown>;
      const rr = d.renterRequestId as
        | { _id?: string; userId?: { name?: string } }
        | undefined;
      const sp = d.supplierProfileId as
        | {
            userId?: { name?: string };
            companyName?: string;
            supplierType?: string;
          }
        | undefined;
      const prop = d.propertyId as { _id?: string } | undefined;
      const renterUser = rr?.userId;
      const supplierUser = sp?.userId;
      return {
        ...d,
        id: d._id,
        requestId: rr?._id ? `${String(rr._id).substring(0, 8)}…` : "—",
        propertyId: prop?._id ? `${String(prop._id).substring(0, 8)}…` : "—",
        renterName: renterUser?.name || "Unknown",
        supplierName: sp?.companyName || supplierUser?.name || "Unknown",
        supplierType: sp?.supplierType || "",
        status: d.status,
        sourcePriority: d.sourcePriority,
        updatedAt: d.updatedAt
          ? new Date(d.updatedAt as string).toLocaleString()
          : "N/A",
      };
    });
  },

  getFees: async () => {
    const docs = await listFeeRecords();
    return docs.map((doc) => {
      const d = doc as Record<string, unknown>;
      const conn = d.connectionId as
        | {
            _id?: string;
            renterRequestId?: { userId?: { name?: string } };
          }
        | undefined;
      const rr = conn?.renterRequestId;
      const ru = rr?.userId;
      return {
        ...d,
        id: d._id,
        matchId: conn?._id ? String(conn._id).substring(0, 10) : "N/A",
        amount: `GH₵ ${d.onukpaFeeAmount ?? 0}`,
        type: d.feePath,
        status: d.paymentStatus,
        dueDate: d.createdAt
          ? new Date(d.createdAt as string).toLocaleDateString()
          : "",
        renterName: ru?.name || "Unknown",
      };
    });
  },
};

export { fetchAnalytics } from "./analyticsApi";
export { listAuditEvents } from "./auditApi";
