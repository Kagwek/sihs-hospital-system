import type { Request, Response } from "express";
import { authService } from "./auth.service.js";

export const authController = {
  register: async (req: Request, res: Response) => {
    const user = await authService.register(req.body);
    return res.status(201).json(user);
  },

  login: async (req: Request, res: Response) => {
    const result = await authService.login(req.body);
    if (!result) return res.status(401).json({ message: "Invalid credentials" });
    return res.json(result);
  },

  refresh: async (req: Request, res: Response) => {
    const result = await authService.refresh(req.body.refreshToken);
    if (!result) return res.status(401).json({ message: "Invalid or expired refresh token" });
    return res.json(result);
  },

  logout: async (req: Request, res: Response) => {
    await authService.logout(req.body.refreshToken);
    return res.json({ message: "Logged out" });
  }
};
