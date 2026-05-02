import { Router } from "express";
import { asyncHandler } from "../../common/utils/asyncHandler.js";
import { authenticate, type AuthRequest } from "../../common/middleware/auth.middleware.js";
import { aiRouteSchema } from "./ai.schemas.js";
import { aiController } from "./ai.controller.js";

export const aiModuleRouter = Router();
aiModuleRouter.use(authenticate);

aiModuleRouter.post(
  "/route",
  asyncHandler(async (req: AuthRequest, res) => {
    const parsed = aiRouteSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json(parsed.error.format());
    req.body = parsed.data;
    return aiController.route(req, res);
  })
);
