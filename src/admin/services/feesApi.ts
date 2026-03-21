import apiClient from "./apiClient";
import type { AdminOkDocs } from "./adminTypes";

export async function listFeeRecords(): Promise<Record<string, unknown>[]> {
  const { data } = await apiClient.get<AdminOkDocs<Record<string, unknown>>>("/admin/fees");
  if (!data.ok) throw new Error(data.error || "Failed to load fees");
  return data.docs ?? [];
}
