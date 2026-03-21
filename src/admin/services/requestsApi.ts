import apiClient from "./apiClient";
import type { AdminOkDocs } from "./adminTypes";

export async function listRenterRequests(): Promise<Record<string, unknown>[]> {
  const { data } = await apiClient.get<AdminOkDocs<Record<string, unknown>>>("/admin/requests");
  if (!data.ok) throw new Error(data.error || "Failed to load requests");
  return data.docs ?? [];
}

export async function patchAdminRequest(
  id: string,
  body: { status?: string; adminNotes?: string }
): Promise<void> {
  const { data } = await apiClient.patch<{ ok: boolean; error?: string }>(
    `/admin/requests/${encodeURIComponent(id)}`,
    body
  );
  if (!data.ok) throw new Error(data.error || "Failed to update request");
}
