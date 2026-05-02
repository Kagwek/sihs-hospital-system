import type { Response } from "express";
import type { AuthRequest } from "../../common/middleware/auth.middleware.js";
import { reportingService } from "./reporting.service.js";

export const reportingController = {
  async analytics(_req: AuthRequest, res: Response) {
    const data = await reportingService.analytics();
    return res.json(data);
  }
};
