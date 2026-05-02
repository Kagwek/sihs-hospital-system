import { z } from "zod";

export const prescribeSchema = z.object({
  patientId: z.string(),
  medication: z.string(),
  dosage: z.string(),
  instructions: z.string()
});
