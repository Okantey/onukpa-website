/** Shared shapes for `/api/admin/*` responses (onukpa-bot Express). */

export interface AdminOkDocs<T> {
  ok: boolean;
  docs: T[];
  error?: string;
}

export interface AdminOkStats {
  ok: boolean;
  stats: AnalyticsPayload;
  error?: string;
}

export interface AnalyticsSummary {
  totalRequests: number;
  activeRequests: number;
  totalProperties: number;
  activeProperties: number;
  pendingReviewProperties: number;
  totalSuppliers: number;
  totalVerifiedSuppliers: number;
  totalLandlords: number;
  totalAgents: number;
  totalRevenueGHS: number;
  totalPaymentsCount: number;
  feesPendingCount: number;
  matchCandidatesTotal: number;
  matchCandidatesOpen: number;
  matchesConnected: number;
}

export interface AnalyticsBreakdownRow {
  _id: string | null;
  count: number;
}

export interface AnalyticsPayload {
  summary: AnalyticsSummary;
  breakdown: {
    byCategory: AnalyticsBreakdownRow[];
    topLocations: AnalyticsBreakdownRow[];
  };
  recentActivity: {
    latestRequests: Record<string, unknown>[];
  };
}

export interface AuditEventRow {
  _id: string;
  entityType: string;
  entityId: string;
  eventType: string;
  actorType: string;
  actorId?: string;
  meta?: Record<string, unknown>;
  createdAt: string;
}

export interface AdminAuditResponse {
  ok: boolean;
  docs: AuditEventRow[];
  error?: string;
}
