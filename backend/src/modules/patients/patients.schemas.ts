import { z } from "zod";

export const createPatientSchema = z.object({
  name: z.string().min(2),
  dob: z.string().datetime(),
  gender: z.string().min(1),
  contact: z.string().min(7),
  nextOfKin: z.string().min(2),
  nhifNumber: z.string().optional(),
  shaMemberNumber: z.string().optional()
});
