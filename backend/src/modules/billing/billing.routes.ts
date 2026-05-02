import { Router } from "express";
import { asyncHandler } from "../../common/utils/asyncHandler.js";
import { authenticate, type AuthRequest } from "../../common/middleware/auth.middleware.js";
import { authorize } from "../../common/middleware/rbac.middleware.js";
import { createBillingSchema } from "./billing.schemas.js";
import { billingController } from "./billing.controller.js";

export const billingRouter = Router();
billingRouter.use(authenticate);

billingRouter.get(
  "/",
  authorize(["ADMIN", "FINANCE"]),
  asyncHandler(async (req: AuthRequest, res) => billingController.list(req, res))
);

billingRouter.post(
  "/",
  authorize(["FINANCE"]),
  asyncHandler(async (req: AuthRequest, res) => {
    const parsed = createBillingSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json(parsed.error.format());
    req.body = parsed.data;
    return billingController.create(req, res);
  })
);
