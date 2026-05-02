import { aiRouter } from "../../common/utils/aiRouter.js";
import type { z } from "zod";
import { aiRouteSchema } from "./ai.schemas.js";

export type AiRouteInput = z.infer<typeof aiRouteSchema>;

export const aiService = {
  route(input: AiRouteInput) {
    return aiRouter(input);
  }
};
