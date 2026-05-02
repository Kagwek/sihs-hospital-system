import type { NextFunction, Response } from "express";
import { prisma } from "../utils/prisma.js";
import type { AuthRequest } from "./auth.middleware.js";

function safePayload(req: AuthRequest) {
  if (req.method === "GET") return undefined;
  if (req.path.startsWith("/api/auth")) {
    return { redacted: true, reason: "auth_body_omitted" };
  }
  return req.body as object;
}

export async function auditLogger(req: AuthRequest, _res: Response, next: NextFunction) {
  if (!req.path.startsWith("/api")) return next();
  await prisma.auditLog.create({
    data: {
      actorId: req.user?.sub,
      action: "API_ACCESS",
      route: req.path,
      method: req.method,
      payload: safePayload(req)
    }
  });
  next();
}
