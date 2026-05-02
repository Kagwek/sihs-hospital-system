import type { Response } from "express";
import type { AuthRequest } from "../../common/middleware/auth.middleware.js";
import { pharmacyService } from "./pharmacy.service.js";

export const pharmacyController = {
  async list(_req: AuthRequest, res: Response) {
    const rows = await pharmacyService.list();
    return res.json(rows);
  },

  async prescribe(req: AuthRequest, res: Response) {
    const row = await pharmacyService.prescribe({ ...req.body, doctorId: req.user!.sub });
    return res.status(201).json(row);
  },

  async dispense(req: AuthRequest, res: Response) {
    const result = await pharmacyService.dispense(req.params.id, req.user?.sub);
    if (result?.error === "NOT_FOUND") {
      return res.status(404).json({ message: "Prescription not found" });
    }
    return res.json({ message: "Medication dispensed" });
  }
};
