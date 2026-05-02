import type { Response } from "express";
import type { AuthRequest } from "../../common/middleware/auth.middleware.js";
import { billingService } from "./billing.service.js";

export const billingController = {
  async list(_req: AuthRequest, res: Response) {
    const rows = await billingService.list();
    return res.json(rows);
  },

  async create(_req: AuthRequest, res: Response) {
    const row = await billingService.create(_req.body);
    return res.status(201).json(row);
  }
};
