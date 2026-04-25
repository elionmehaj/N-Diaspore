import app from "./app.js";
import { logger } from "./lib/logger.js";

import http from "http";
import { Server } from "socket.io";
import { connect } from "./agents-core/db.js";
import scheduler from "./agents-core/scheduler.js";
import customerConcierge from "./agents-core/customerConcierge.js";

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  const sessionId = `ws_${socket.id}_${Date.now()}`;
  console.log(`[SOCKET] Client connected: ${socket.id}`);

  socket.on("chat-message", async (data) => {
    const { message } = data;
    if (!message) return;

    socket.emit("typing", { isTyping: true });

    try {
      const response = await customerConcierge.chat(sessionId, message);
      socket.emit("chat-response", response);
    } catch (err) {
      socket.emit("chat-response", {
        message: "Sorry, something went wrong. Please try again!",
        intent: "error",
        cards: [],
        bestDates: [],
        timestamp: new Date(),
      });
    }

    socket.emit("typing", { isTyping: false });
  });

  socket.on("disconnect", () => {
    console.log(`[SOCKET] Client disconnected: ${socket.id}`);
  });
});

async function startServer() {
  try {
    await connect();
    logger.info("[SERVER] Database connected");

    server.listen(port, () => {
      logger.info({ port }, "Server listening");
    });

    scheduler.start(io);
    await scheduler.runInitial();
  } catch (err) {
    logger.error({ err }, "Fatal startup error");
    process.exit(1);
  }
}

startServer();
