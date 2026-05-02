import type { Response } from "express";
import type { AuthRequest } from "../../common/middleware/auth.middleware.js";
import { aiService } from "./ai.service.js";

export const aiController = {
  route(_req: AuthRequest, res: Response) {
    const out = aiService.route(_req.body);
    return res.json(out);
  }
};
