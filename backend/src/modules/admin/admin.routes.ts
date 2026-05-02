import { Router } from "express";
import { asyncHandler } from "../../common/utils/asyncHandler.js";
import { authenticate, type AuthRequest } from "../../common/middleware/auth.middleware.js";
import { authorize } from "../../common/middleware/rbac.middleware.js";
import { adminController } from "./admin.controller.js";

export const adminRouter = Router();
adminRouter.use(authenticate, authorize(["ADMIN"]));

adminRouter.get(
  "/dashboard",
  asyncHandler(async (req: AuthRequest, res) => adminController.dashboard(req, res))
);
