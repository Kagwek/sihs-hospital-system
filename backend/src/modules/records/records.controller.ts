import type { Response } from "express";
import type { AuthRequest } from "../../common/middleware/auth.middleware.js";
import { recordsService } from "./records.service.js";

export const recordsController = {
  async list(_req: AuthRequest, res: Response) {
    const rows = await recordsService.list();
    return res.json(rows);
  },

  async create(req: AuthRequest, res: Response) {
    const record = await recordsService.create({
      ...req.body,
      createdBy: req.user!.sub
    });
    return res.status(201).json(record);
  }
};
