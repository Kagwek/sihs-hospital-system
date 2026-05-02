import { Router } from "express";
import { asyncHandler } from "../../common/utils/asyncHandler.js";
import { authenticate, type AuthRequest } from "../../common/middleware/auth.middleware.js";
import { authorize } from "../../common/middleware/rbac.middleware.js";
import { createLabSchema } from "./labs.schemas.js";
import { labsController } from "./labs.controller.js";

export const labsRouter = Router();
labsRouter.use(authenticate);

labsRouter.get(
  "/",
  authorize(["ADMIN", "DOCTOR", "LAB"]),
  asyncHandler(async (req: AuthRequest, res) => labsController.list(req, res))
);

labsRouter.post(
  "/",
  authorize(["LAB"]),
  asyncHandler(async (req: AuthRequest, res) => {
    const parsed = createLabSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json(parsed.error.format());
    req.body = parsed.data;
    return labsController.create(req, res);
  })
);
