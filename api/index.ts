import app from "../apps/api/src/app.js";
import { connect } from "../apps/api/src/agents-core/db.js";

let databaseReady: Promise<void> | null = null;
const DATABASE_BACKED_PREFIXES = [
  "/api/flights",
  "/api/buses",
  "/api/dates",
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
      console.warn("[VERCEL] Database-backed route unavailable:", err);
      res.statusCode = 200;
      res.setHeader("content-type", "application/json");
      res.end(
        JSON.stringify({
          count: 0,
          data: [],
          warning: "database_unavailable",
          message: "Live travel data is temporarily unavailable.",
        }),
      );
      return;
    }
  }

  return app(req, res);
}
