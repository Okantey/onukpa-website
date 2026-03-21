import apiClient from "./apiClient";
import type { AdminOkDocs } from "./adminTypes";

export async function listMatchCandidates(): Promise<Record<string, unknown>[]> {
  const { data } = await apiClient.get<AdminOkDocs<Record<string, unknown>>>("/admin/matches");
  if (!data.ok) throw new Error(data.error || "Failed to load matches");
  return data.docs ?? [];
}

export async function postAdminManualAssign(body: {
  renterRequestId: string;
  propertyId: string;
}): Promise<{ matchId: string; propertyId: string; renterLink: string }> {
  const { data } = await apiClient.post<{
    ok: boolean;
    matchId?: string;
    propertyId?: string;
    renterLink?: string;
    message?: string;
    error?: string;
  }>("/admin/matches/assign", body);
  if (!data.ok || !data.matchId || !data.renterLink) {
    throw new Error(data.message || data.error || "Assignment failed");
  }
  return {
    matchId: data.matchId,
    propertyId: data.propertyId ?? body.propertyId,
    renterLink: data.renterLink,
  };
}
