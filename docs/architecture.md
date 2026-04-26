# KahKosova Architecture

KahKosova is organized as a pnpm workspace with deployable apps in `apps/`, shared packages in `lib/`, scripts in `scripts/`, and legacy/design tooling in `tools/`.

## Apps

- `apps/web`: Vite/React public SPA. It owns routes, pages, UI components, contexts, hooks, and authored static assets.
- `apps/api`: Express API server. It owns REST routes, MongoDB connection logic, scheduler startup, Socket.IO local runtime, and the four agent classes.
- `tools/mockup-sandbox`: Replit design/mockup preview app kept outside the production app path.

## Shared Packages

- `lib/api-spec`: OpenAPI source and Orval generation config.
- `lib/api-client-react`: generated React Query/fetch client consumed by the web app.
- `lib/api-zod`: generated Zod request/response schemas consumed by the API server.
- `lib/shared`: hand-authored shared route metadata and agent/trip response types.
- `lib/db`: Drizzle/PostgreSQL package retained as legacy or future database infrastructure. The current API runtime uses MongoDB instead.

## Runtime Flow

Local development starts both apps with `pnpm run dev`:

User action -> `apps/web` route/component -> `/api/*` generated client or fetch -> `apps/api` Express route -> MongoDB/agent service -> JSON response -> React view.

The local API entrypoint is `apps/api/src/index.ts`; it starts the HTTP server, attaches Socket.IO, connects MongoDB, starts scheduled agent refreshes, and performs initial agent population.

Vercel uses `api/index.ts`; it imports `apps/api/src/app.ts` and connects MongoDB on demand. It does not start Socket.IO or the scheduler.
