import { Router, Request, Response } from "express";
import { asyncHandler } from "../../common/utils/asyncHandler.js";
import { authenticate } from "../../common/middleware/auth.middleware.js";
import { authorize } from "../../common/middleware/rbac.middleware.js";
import { createRecordSchema } from "./records.schemas.js";
import { recordsController } from "./records.controller.js";

interface AuthRequest extends Request {
  user?: any;
}

export const recordsRouter = Router();

// 🔐 All routes require authentication
recordsRouter.use(authenticate);

// 📥 GET ALL RECORDS (Admin + Doctor)
recordsRouter.get(
  "/",
  authorize(["ADMIN", "DOCTOR"]),
  asyncHandler(async (req: AuthRequest, res) => {
    await recordsController.list(req, res);
  })
);

// ➕ CREATE RECORD (Doctor only)
recordsRouter.post(
  "/",
  authorize(["DOCTOR", "ADMIN"]),
  asyncHandler(async (req: AuthRequest, res) => {
    const parsed = createRecordSchema.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json(parsed.error.format());
      return;
    }

    req.body = parsed.data;

    await recordsController.create(req, res);
  })
);