import { NextFunction, Request, Response } from "express";

import { authCookieName, verifyAccessToken } from "../lib/jwt";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.[authCookieName];

  if (!token || typeof token !== "string") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const payload = verifyAccessToken(token);
    const userId = payload.sub;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    // Attach userId for handlers (keeps the MVP simple).
    (req as any).user = { id: userId };
    return next();
  } catch (_e) {
    return res.status(401).json({ error: "Unauthorized" });
  }
}

