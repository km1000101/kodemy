import { Router } from "express";

import { prisma } from "../lib/prisma";
import { requireAuth } from "../middleware/requireAuth";
import { buildSubjectTree } from "../lib/learning";

export const subjectsRouter = Router();

subjectsRouter.get("/", async (req, res) => {
  const page = Number(req.query.page ?? 1);
  const pageSize = Number(req.query.pageSize ?? 20);
  const q = typeof req.query.q === "string" ? req.query.q : null;

  const where: any = { isPublished: true };
  if (q) {
    where.OR = [{ title: { contains: q, mode: "insensitive" } }, { slug: { contains: q, mode: "insensitive" } }];
  }

  const [total, subjects] = await Promise.all([
    prisma.subject.count({ where }),
    prisma.subject.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: Math.max(0, (page - 1) * pageSize),
      take: Math.max(1, pageSize),
      select: { id: true, title: true, slug: true, description: true, isPublished: true },
    }),
  ]);

  return res.json({ subjects, total, page, pageSize });
});

subjectsRouter.get("/:subjectId", async (req, res) => {
  const subjectId = Number(req.params.subjectId);
  if (!Number.isFinite(subjectId)) return res.status(400).json({ error: "Invalid subjectId" });

  const subject = await prisma.subject.findUnique({
    where: { id: subjectId },
    select: { id: true, title: true, slug: true, description: true, isPublished: true },
  });

  if (!subject) return res.status(404).json({ error: "Subject not found" });
  if (!subject.isPublished) return res.status(404).json({ error: "Subject not found" });

  return res.json({ subject });
});

subjectsRouter.get("/:subjectId/tree", requireAuth, async (req, res) => {
  const subjectId = Number(req.params.subjectId);
  const userId = (req as any).user?.id as number | undefined;
  if (!Number.isFinite(subjectId) || !userId) return res.status(400).json({ error: "Invalid request" });

  // Only allow published subjects in this MVP.
  const subject = await prisma.subject.findUnique({ where: { id: subjectId }, select: { id: true, isPublished: true } });
  if (!subject || !subject.isPublished) return res.status(404).json({ error: "Subject not found" });

  const tree = await buildSubjectTree(subjectId, userId);
  return res.json({ tree });
});

