import { z } from "zod";

export const aiRouteSchema = z.object({
  symptoms: z.array(z.string()),
  vitals: z.object({
    systolicBP: z.number().optional(),
    diastolicBP: z.number().optional(),
    bmi: z.number().optional(),
    hasDiabetes: z.boolean().optional()
  })
});
