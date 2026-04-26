# Deployment Notes

The root `vercel.json` is the production deployment definition.

- `buildCommand`: `pnpm run build`
- `outputDirectory`: `public`
- static SPA fallback: every non-API request rewrites to `/index.html`
- API rewrite: `/api/*` rewrites to `api/index.ts`
- serverless include files: `lib/**` and `apps/**`

The frontend build in `apps/web/vite.config.ts` writes to the root `public/` folder because the root Vercel project serves that directory.

Important behavior difference:

- Local `apps/api/src/index.ts` supports Socket.IO and scheduled agent refreshes.
- Vercel `api/index.ts` supports HTTP routes only and requires existing MongoDB data for agent dashboard endpoints.

If production must support realtime Socket.IO and scheduled agent population, use a serverful deployment target or add Vercel Cron/HTTP refresh endpoints explicitly.
