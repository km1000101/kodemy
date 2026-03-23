import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { healthRouter } from "./routes/health.routes";
import { authRouter } from "./routes/auth.routes";
import { subjectsRouter } from "./routes/subjects.routes";
import { videosRouter } from "./routes/videos.routes";
import { progressRouter } from "./routes/progress.routes";

export function createApp() {
  const app = express();

  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(cookieParser());

  app.get("/", (_req, res) => {
    res.json({ name: "kodemy-backend", ok: true });
  });

  app.use("/api/health", healthRouter);
  app.use("/api/auth", authRouter);
  app.use("/api/subjects", subjectsRouter);
  app.use("/api/videos", videosRouter);
  app.use("/api/progress", progressRouter);

  // 404 handler (must be last)
  app.use((_req, res) => {
    res.status(404).json({ error: "Not found" });
  });

  // Basic error handler (keeps responses consistent)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    // Avoid leaking internal errors to the client.
    // eslint-disable-next-line no-console
    console.error("Unhandled backend error:", err);
    const detail = process.env.NODE_ENV === "production" ? undefined : err?.message ?? String(err);
    res.status(500).json({ error: "Internal server error", detail });
  });

  return app;
}

