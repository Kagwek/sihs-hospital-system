import type { Response } from "express";
import type { AuthRequest } from "../../common/middleware/auth.middleware.js";
import { labsService } from "./labs.service.js";

export const labsController = {
  async list(_req: AuthRequest, res: Response) {
    const rows = await labsService.list();
    return res.json(rows);
  },

  async create(req: AuthRequest, res: Response) {
    const result = await labsService.create({
      ...req.body,
      verifiedBy: req.user?.sub
    });
    if (result && "error" in result && result.error === "NEEDS_VERIFICATION") {
      return res.status(400).json({ message: "Lab results must be verified before completion." });
    }
    return res.status(201).json(result);
  }
};
