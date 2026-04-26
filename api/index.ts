import app from "../artifacts/api-server/src/app.js";
import { connect } from "../artifacts/api-server/src/agents-core/db.js";

let databaseReady: Promise<void> | null = null;

function ensureDatabase() {
  if (!databaseReady) {
    databaseReady = connect()
      .then(() => undefined)
      .catch((err) => {
        databaseReady = null;
        throw err;
      });
  }

  return databaseReady;
}

export default async function handler(req: any, res: any) {
  if (!req.url?.startsWith("/api/healthz")) {
    try {
      await ensureDatabase();
    } catch (err) {
      console.error("[VERCEL] Database connection failed:", err);
      res.statusCode = 503;
      res.setHeader("content-type", "application/json");
      res.end(
        JSON.stringify({
          error: "database_unavailable",
          message: "Database connection is not configured or reachable.",
        }),
      );
      return;
    }
  }

  return app(req, res);
}
