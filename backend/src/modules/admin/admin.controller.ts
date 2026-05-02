import type { Response } from "express";
import type { AuthRequest } from "../../common/middleware/auth.middleware.js";
import { adminService } from "./admin.service.js";

export const adminController = {
  async dashboard(_req: AuthRequest, res: Response) {
    const data = await adminService.dashboard();
    return res.json(data);
  }
};
