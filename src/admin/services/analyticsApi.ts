import apiClient from "./apiClient";
import type { AdminOkStats, AnalyticsPayload } from "./adminTypes";

export async function fetchAnalytics(): Promise<AnalyticsPayload> {
  const { data } = await apiClient.get<AdminOkStats>("/admin/analytics");
  if (!data.ok) throw new Error(data.error || "Failed to load analytics");
  return data.stats;
}
