import { z } from "zod";

export const createLabSchema = z.object({
  patientId: z.string(),
  testType: z.string(),
  result: z.string(),
  status: z.enum(["PENDING", "IN_REVIEW", "COMPLETE"]),
  flaggedCritical: z.boolean().default(false),
  verified: z.boolean().optional().default(false)
});
