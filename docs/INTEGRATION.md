# Onukpa Web ↔ API integration

This document describes how the **marketing site**, **supplier flows**, and **admin console** connect to the **onukpa-bot** backend.

## Repositories

| Area | Path (this workspace) | Role |
|------|------------------------|------|
| Web app | `Web/onukpa` | Vite + React (public pages, `/supplier/complete`, `/supplier/portal/:token`, `/supplier/add-property/:token`, `/admin/*`) |
| Backend | `Backend/onukpa-bot` | Express API, WhatsApp bot, MongoDB, BullMQ workers |

## Environment variables (Web)

| Variable | Purpose | Example |
|----------|---------|---------|
| `VITE_API_URL` | Axios base URL for **admin** + auth (must include `/api`) | `http://localhost:3000/api` |
| `VITE_ONUKPA_API_BASE_URL` | `fetch` helper in `src/api/http.ts` — paths must include `/api/...` (e.g. `/api/properties/public/:id`) | `https://api.onukpa.com` |

See `.env.example` in the web root.

## Backend HTTP layout (onukpa-bot)

Mounted in `bot.ts`:

| Prefix | Router | Notes |
|--------|--------|-------|
| `/api/auth` | `authRoutes` | `POST /login` → `{ ok, token, admin }` |
| `/api/admin/*` | `adminRoutes` | **Bearer JWT** required. Mutations: `PATCH /admin/properties/:id`, `PATCH /admin/suppliers/:id`, `PATCH /admin/requests/:id` (`status` and/or `adminNotes`), `POST /admin/matches/assign` (`{ renterRequestId, propertyId }`) for manual match + renter link |
| `/api/properties` | `propertyRoutes` | Public property read + interest + uploads |
| `/api/supplier` | `supplierRoutes` | `GET /magic-link/status?token=` (public: valid + `tokenType`), plus token-scoped property + upload routes |

`POST /agent/add` (legacy) returns **410** — agent onboarding is **WhatsApp-only** via the bot.

Default server port: **3000** (`PORT` env).

### Supplier magic link (WhatsApp onboarding)

1. Bot finishes landlord/agent onboarding and calls `generateMagicLink({ tokenType: "property_listing" })`.
2. Link format: `{WEB_APP_URL}/supplier/portal/{token}` (`services/auth.ts`).
3. **Portal** (`SupplierPortalPage`) calls `GET /api/supplier/properties?token=…` to list that user’s listings (all statuses).
4. **Add property** (`AddPropertyPage`) posts to `POST /api/supplier/properties?token=…` with the JSON body from `src/api/suppliers.ts` (`PropertyPayload`). Token is **not** consumed on submit so the same link stays valid for multiple listings until expiry.

Payload mapping to `Property` is implemented in `services/supplierListing.ts` (category → `Rooms` / `Apartments` / `CampusHostels` / `StoresOffices`, availability, advance period, etc.).

### CORS

Production origins plus local Vite dev are allowed (`http://localhost:5173`, …). For extra origins set **`CORS_ORIGIN`** as a comma-separated list (e.g. `https://staging.onukpa.com,https://app.example.com`). `credentials: true` is enabled for future cookie auth.

**Public HTTPS site → local API:** If you open `https://onukpa.com` in the browser but `VITE_API_URL` points at `http://localhost:3000/api`, Chrome’s **Private Network Access** rules apply. The API responds with `Access-Control-Allow-Private-Network: true` on preflight so that flow can work for debugging. For real production, build the web app with **`VITE_API_URL`** set to your **HTTPS** API host, not localhost.

## Admin API modules (Web)

Source: `src/admin/services/`

| Module | Backend route | Maps to UI |
|--------|---------------|------------|
| `requestsApi.ts` | `GET /admin/requests` | Requests page |
| `propertiesApi.ts` | `GET /admin/properties` | Properties page |
| `suppliersApi.ts` | `GET /admin/suppliers` | Suppliers page |
| `matchesApi.ts` | `GET /admin/matches` | Matches page |
| `feesApi.ts` | `GET /admin/fees` | Fees page |
| `analyticsApi.ts` | `GET /admin/analytics` | Overview + Analytics |
| `auditApi.ts` | `GET /admin/audit?limit=` | Audit page |

`adminApi.ts` aggregates list endpoints into row shapes used by tables (renter name, supplier label, etc.) and exposes `getDashboardPayload()` for Overview.

### Auth

- Login: `LoginPage` posts to `/auth/login` via `apiClient` (same base URL).
- Token stored in `localStorage` as `adminToken`; `AuthContext` sets `apiClient.defaults.headers.common.Authorization`.
- On **401** from protected routes, `apiClient` clears storage and redirects to `/admin/login` (login failures are excluded).

## Status enums (admin UI)

`src/constants/admin.ts` mirrors **intended** operational states. **Match** statuses are aligned with `MatchCandidate` in the backend (`shown_to_renter`, `supplier_notified`, …). **Request** statuses should stay aligned with `RenterRequest.status` as you evolve the schema.

### Public property + interest

- `GET /api/properties/public/:id` — live listing for the marketing site.
- `POST /api/properties/:id/interest` — body `{ source?, matchCandidateId? }`; updates `MatchCandidate` when `?m=` matches bot links, writes `PROPERTY_INTEREST_WEB` audit, WhatsApp-notifies supplier when the socket is up.
- `POST /api/properties/:id/submit-interest` — legacy alias (same handler).

## What is not wired yet

- **Worker runtime**: `tests/worker.test.ts` exercises the same **query logic** as `mainWorker` without starting BullMQ/Redis. Scheduled jobs (`stale_property_check`, `supplier_nudge`) need **Redis** and the `mainWorker` process. If Redis is down at startup, the API still runs but job scheduling is skipped (see backend README).

### Agent onboarding (web)

- The marketing site **does not** register agents. The **For agents** section links to WhatsApp with a pre-filled message so users start onboarding in the bot.

### Supplier listing fields vs bot (taxonomy)

- **Subtype** on Add/Edit property uses the **same fixed strings** as the WhatsApp bot room/apartment/store options so `findMatches` `subType` filtering stays consistent. Source of truth for the bot: `Backend/onukpa-bot/constants/taxonomy.ts`; mirror for the web form: `Web/onukpa/src/constants/propertyTaxonomy.ts` (keep in sync).
- **Area** dropdown lists **bot renter areas first** (same order), then the extended Accra list (`src/constants/areas.ts`). Campus hostel searches use **UG / UPSA** expanded to geographic `area` values in `findMatches` (see `CAMPUS_MATCH_AREA_GROUPS` in the backend taxonomy file).

### Supplier media URLs

Upload responses use paths like `/uploads/...` on the API host. The web app prefixes these with `VITE_ONUKPA_API_BASE_URL` via `resolveMediaUrl()` so `<img src>` works when the site and API are on different origins.

## Local dev checklist

1. MongoDB running; `onukpa-bot` `connectDB` configured.
2. **Optional:** Redis for BullMQ recurring jobs (`REDIS_HOST` / `REDIS_PORT`; see backend `README.md`).
3. Start API/bot: `bun`/`node` entry (port 3000).
4. Seed admin: `scripts/seed-admin.ts` (see script for default credentials—change in production).
5. Web: `npm run dev` (Vite, port 5173).
6. Set `VITE_API_URL=http://localhost:3000/api` in `Web/onukpa/.env`.
