import { Router } from "express";

import { requireAuth } from "../middleware/requireAuth";
import { buildVideoPage } from "../lib/learning";

export const videosRouter = Router();

videosRouter.get("/:videoId", requireAuth, async (req, res) => {
  const videoId = Number(req.params.videoId);
  const userId = (req as any).user?.id as number | undefined;

  if (!Number.isFinite(videoId) || !userId) return res.status(400).json({ error: "Invalid request" });

  try {
    const video = await buildVideoPage(videoId, userId);
    return res.json({ video });
  } catch (_e) {
    return res.status(404).json({ error: "Video not found" });
  }
});

