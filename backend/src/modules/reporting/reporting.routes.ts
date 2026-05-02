import { Router } from "express";
import { asyncHandler } from "../../common/utils/asyncHandler.js";
import { authenticate, type AuthRequest } from "../../common/middleware/auth.middleware.js";
import { authorize } from "../../common/middleware/rbac.middleware.js";
import { reportingController } from "./reporting.controller.js";

export const reportingRouter = Router();
reportingRouter.use(authenticate, authorize(["ADMIN", "FINANCE"]));

reportingRouter.get(
  "/analytics",
  asyncHandler(async (req: AuthRequest, res) => reportingController.analytics(req, res))
);
