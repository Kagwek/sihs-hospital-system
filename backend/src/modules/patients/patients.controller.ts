import type { Response } from "express";
import type { AuthRequest } from "../../common/middleware/auth.middleware.js";
import { patientsService } from "./patients.service.js";

export const patientsController = {
  async list(_req: AuthRequest, res: Response) {
    const rows = await patientsService.list();
    return res.json(rows);
  },

  async create(_req: AuthRequest, res: Response) {
    try {
      const patient = await patientsService.create(_req.body);
      return res.status(201).json(patient);
    } catch {
      return res.status(409).json({ message: "Patient already exists (duplicate prevented)." });
    }
  },

  async getById(req: AuthRequest, res: Response) {
    const patient = await patientsService.getById(req.params.id);
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    return res.json(patient);
  }
};
