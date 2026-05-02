import { Router } from "express";
import { asyncHandler } from "../../common/utils/asyncHandler.js";
import { authenticate, type AuthRequest } from "../../common/middleware/auth.middleware.js";
import { authorize } from "../../common/middleware/rbac.middleware.js";
import { prescribeSchema } from "./pharmacy.schemas.js";
import { pharmacyController } from "./pharmacy.controller.js";

export const pharmacyRouter = Router();
pharmacyRouter.use(authenticate);

pharmacyRouter.get(
  "/",
  authorize(["ADMIN", "PHARMACY", "DOCTOR"]),
  asyncHandler(async (req: AuthRequest, res) => pharmacyController.list(req, res))
);

pharmacyRouter.post(
  "/prescribe",
  authorize(["DOCTOR"]),
  asyncHandler(async (req: AuthRequest, res) => {
    const parsed = prescribeSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json(parsed.error.format());
    req.body = parsed.data;
    return pharmacyController.prescribe(req, res);
  })
);

pharmacyRouter.post(
  "/dispense/:id",
  authorize(["PHARMACY"]),
  asyncHandler(async (req: AuthRequest, res) => pharmacyController.dispense(req, res))
);
