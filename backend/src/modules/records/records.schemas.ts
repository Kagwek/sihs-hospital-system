import { z } from "zod";

export const createRecordSchema = z.object({
  patientId: z.string().min(1),
  diagnosis: z.string().min(2),
  notes: z.string().min(3)
});
