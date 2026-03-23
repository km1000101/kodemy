import { Router } from "express";
import bcrypt from "bcrypt";

import { prisma } from "../lib/prisma";
import { accessTokenMaxAgeMs, authCookieName, signAccessToken } from "../lib/jwt";

export const authRouter = Router();

function getCookieOptions() {
  const isProd = process.env.NODE_ENV === "production";
  return {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax" as const,
    path: "/",
    maxAge: accessTokenMaxAgeMs,
  };
}

authRouter.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body ?? {};
    if (!email || !password) return res.status(400).json({ error: "Missing email/password" });

    const passwordHash = await bcrypt.hash(String(password), 10);

    const user = await prisma.user.create({
      data: {
        email: String(email).toLowerCase(),
        passwordHash,
        name: name ? String(name) : null,
      },
      select: { id: true, email: true, name: true },
    });

    const token = signAccessToken(user.id);
    res.cookie(authCookieName, token, getCookieOptions());
    return res.status(201).json({ ok: true, user });
  } catch (e: any) {
    // Prisma unique constraint for email.
    if (e?.code === "P2002") return res.status(409).json({ error: "Email already in use" });
    // eslint-disable-next-line no-console
    console.error("Auth register failed:", e);
    const detail = process.env.NODE_ENV === "production" ? undefined : e?.message;
    return res.status(500).json({ error: "Internal server error", detail });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body ?? {};
    if (!email || !password) return res.status(400).json({ error: "Missing email/password" });

    const user = await prisma.user.findUnique({
      where: { email: String(email).toLowerCase() },
      select: { id: true, email: true, name: true, passwordHash: true },
    });

    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const ok = await bcrypt.compare(String(password), user.passwordHash);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });

    const token = signAccessToken(user.id);
    res.cookie(authCookieName, token, getCookieOptions());

    return res.json({
      ok: true,
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (e: any) {
    // eslint-disable-next-line no-console
    console.error("Auth login failed:", e);
    const detail = process.env.NODE_ENV === "production" ? undefined : e?.message;
    return res.status(500).json({ error: "Internal server error", detail });
  }
});

authRouter.post("/logout", async (_req, res) => {
  res.clearCookie(authCookieName, { path: "/" });
  return res.json({ ok: true });
});

