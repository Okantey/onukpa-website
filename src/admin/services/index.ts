/**
 * Admin API surface (onukpa-bot `/api/admin/*`).
 * Prefer importing specific modules in features; this barrel is for discoverability.
 */
export { default as apiClient } from "./apiClient";
export * from "./adminTypes";
export * from "./requestsApi";
export * from "./propertiesApi";
export * from "./suppliersApi";
export * from "./matchesApi";
export * from "./feesApi";
export * from "./analyticsApi";
export * from "./auditApi";
export * from "./adminApi";
