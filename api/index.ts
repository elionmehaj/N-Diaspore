import app from "../apps/api/src/app.js";
import { connect } from "../apps/api/src/agents-core/db.js";

let databaseReady: Promise<void> | null = null;
const DATABASE_BACKED_PREFIXES = [
  "/api/flights",
  "/api/buses",
  "/api/dates",
  "/api/chat",
];

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
  const needsDatabase = DATABASE_BACKED_PREFIXES.some((prefix) =>
    req.url?.startsWith(prefix),
  );

  if (needsDatabase) {
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
