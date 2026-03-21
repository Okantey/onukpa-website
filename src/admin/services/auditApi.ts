import apiClient from "./apiClient";
import type { AdminAuditResponse, AuditEventRow } from "./adminTypes";

export async function listAuditEvents(limit = 100): Promise<AuditEventRow[]> {
  const { data } = await apiClient.get<AdminAuditResponse>("/admin/audit", {
    params: { limit },
  });
  if (!data.ok) throw new Error(data.error || "Failed to load audit log");
  return (data.docs ?? []) as AuditEventRow[];
}
