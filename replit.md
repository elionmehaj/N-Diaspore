# Workspace

## Overview

KahKosova is a pnpm workspace monorepo with a Vite/React web app, an Express/MongoDB API server, generated OpenAPI clients, and a retained Replit mockup sandbox.

## Stack

- Node.js 24
- pnpm workspaces
- TypeScript 5.9
- React 19 and Vite 7
- Express 5
- MongoDB for the active agent runtime
- Drizzle/PostgreSQL package retained in `lib/db` for legacy or future use
- Zod and Orval for API contracts/codegen
- Vercel root deployment using static `public/` output plus `api/index.ts`

## Structure

```text
apps/
  api/                  # Express API, Mongo connector, scheduler, four agents
  web/                  # Vite/React SPA and authored static assets
lib/
  api-spec/             # OpenAPI source and Orval config
  api-client-react/     # generated React Query/fetch client
  api-zod/              # generated Zod schemas
  db/                   # Drizzle/PostgreSQL package, not active in API runtime
  shared/               # shared route metadata and trip/chat types
scripts/                # maintenance scripts
tools/
  mockup-sandbox/       # Replit design/mockup preview app
```

## Core Commands

- `pnpm run dev`: run frontend and backend together.
- `pnpm run dev:frontend`: run `@workspace/kahkosova`.
- `pnpm run dev:backend`: run `@workspace/api-server`.
- `pnpm run build`: typecheck libraries, build API, build frontend into root `public/`, then verify Vercel output.
- `pnpm run typecheck`: run library references and app/tool package typechecks.
- `pnpm --filter @workspace/api-spec run codegen`: regenerate `lib/api-client-react` and `lib/api-zod`.

## Runtime Notes

Local API runtime uses `apps/api/src/index.ts`; it starts Express, Socket.IO, MongoDB, the scheduler, and initial agent population.

Vercel runtime uses `api/index.ts`; it imports the Express app and Mongo connector but does not start Socket.IO or the scheduler. Production agent freshness therefore depends on pre-existing MongoDB data unless a cron/serverful runtime is added.
