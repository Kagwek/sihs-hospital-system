import type { Response } from "express";
import type { AuthRequest } from "../../common/middleware/auth.middleware.js";
import { appointmentsService } from "./appointments.service.js";

export const appointmentsController = {
  async list(_req: AuthRequest, res: Response) {
    const rows = await appointmentsService.list();
    return res.json(rows);
  },

  async create(_req: AuthRequest, res: Response) {
    const result = await appointmentsService.create(_req.body);
    if (result && "error" in result && result.error === "DOUBLE_BOOK") {
      return res.status(409).json({ message: "Doctor already booked at that time." });
    }
    return res.status(201).json(result);
  }
};
