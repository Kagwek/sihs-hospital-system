import { Router } from "express";
import { asyncHandler } from "../../common/utils/asyncHandler.js";
import { authController } from "./auth.controller.js";
import { loginSchema, logoutSchema, refreshSchema, registerSchema } from "./auth.schemas.js";

export const authRouter = Router();

authRouter.post(
  "/register",
  asyncHandler(async (req, res) => {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json(parsed.error.format());
    req.body = parsed.data;
    await authController.register(req, res);
  })
);

authRouter.post(
  "/login",
  asyncHandler(async (req, res) => {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json(parsed.error.format());
    req.body = parsed.data;
    await authController.login(req, res);
  })
);

authRouter.post(
  "/refresh",
  asyncHandler(async (req, res) => {
    const parsed = refreshSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json(parsed.error.format());
    req.body = parsed.data;
    await authController.refresh(req, res);
  })
);

authRouter.post(
  "/logout",
  asyncHandler(async (req, res) => {
    const parsed = logoutSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json(parsed.error.format());
    req.body = parsed.data;
    await authController.logout(req, res);
  })
);
