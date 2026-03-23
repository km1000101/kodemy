import { Router } from "express";

import { prisma } from "../lib/prisma";
import { requireAuth } from "../middleware/requireAuth";

export const progressRouter = Router();

progressRouter.get("/videos/:videoId", requireAuth, async (req, res) => {
  const videoId = Number(req.params.videoId);
  const userId = (req as any).user?.id as number | undefined;
  if (!Number.isFinite(videoId) || !userId) return res.status(400).json({ error: "Invalid request" });

  const row = await prisma.videoProgress.findUnique({
    where: { userId_videoId: { userId, videoId } },
    select: { lastPositionSeconds: true, isCompleted: true, completedAt: true },
  });

  return res.json({
    lastPositionSeconds: row?.lastPositionSeconds ?? 0,
    isCompleted: row?.isCompleted ?? false,
    completedAt: row?.completedAt ?? null,
  });
});

progressRouter.post("/videos/:videoId", requireAuth, async (req, res) => {
  const videoId = Number(req.params.videoId);
  const userId = (req as any).user?.id as number | undefined;
  if (!Number.isFinite(videoId) || !userId) return res.status(400).json({ error: "Invalid request" });

  const { lastPositionSeconds, isCompleted } = req.body ?? {};
  const last = typeof lastPositionSeconds === "number" ? lastPositionSeconds : Number(lastPositionSeconds ?? 0);
  const completed = Boolean(isCompleted);

  const existing = await prisma.videoProgress.findUnique({
    where: { userId_videoId: { userId, videoId } },
    select: { lastPositionSeconds: true, isCompleted: true },
  });

  const nextLastPositionSeconds = Math.max(existing?.lastPositionSeconds ?? 0, last || 0);

  // Once completed, keep completed (prevents accidental regressions from stale client state).
  const finalCompleted = (existing?.isCompleted ?? false) || completed;

  const row = await prisma.videoProgress.upsert({
    where: { userId_videoId: { userId, videoId } },
    update: {
      lastPositionSeconds: nextLastPositionSeconds,
      isCompleted: finalCompleted,
      completedAt: finalCompleted ? new Date() : null,
    },
    create: {
      userId,
      videoId,
      lastPositionSeconds: nextLastPositionSeconds,
      isCompleted: finalCompleted,
      completedAt: finalCompleted ? new Date() : null,
    },
    select: { id: true },
  });

  return res.json({ ok: true, id: row.id });
});

progressRouter.get("/subjects/:subjectId", requireAuth, async (req, res) => {
  const subjectId = Number(req.params.subjectId);
  const userId = (req as any).user?.id as number | undefined;
  if (!Number.isFinite(subjectId) || !userId) return res.status(400).json({ error: "Invalid request" });

  const [totalVideos, completedVideos] = await Promise.all([
    prisma.video.count({
      where: { section: { subjectId } },
    }),
    prisma.videoProgress.count({
      where: {
        userId,
        isCompleted: true,
        video: { section: { subjectId } },
      },
    }),
  ]);

  return res.json({
    totalVideos,
    completedVideos,
    isCompleted: totalVideos > 0 ? completedVideos === totalVideos : false,
  });
});

