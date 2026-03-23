import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET ?? "dev_jwt_secret_change_me";
const ACCESS_TOKEN_TTL_SECONDS = Number(process.env.ACCESS_TOKEN_TTL_SECONDS ?? 900);

const ACCESS_TOKEN_COOKIE = "access_token";

export function signAccessToken(userId: number) {
  return jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: ACCESS_TOKEN_TTL_SECONDS });
}

export function verifyAccessToken(token: string) {
  const payload = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload & { sub?: string | number };
  const sub = payload.sub;
  const userId = typeof sub === "string" ? Number(sub) : sub;
  if (!userId || Number.isNaN(Number(userId))) throw new Error("Invalid token payload");
  return { sub: Number(userId) };
}

export const authCookieName = ACCESS_TOKEN_COOKIE;
export const accessTokenMaxAgeMs = ACCESS_TOKEN_TTL_SECONDS * 1000;

