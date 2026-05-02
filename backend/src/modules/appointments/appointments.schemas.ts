import { z } from "zod";

export const createAppointmentSchema = z.object({
  patientId: z.string().min(1),
  doctorId: z.string().min(1),
  department: z.string().min(2),
  datetime: z.string().datetime(),
  emergencyOverride: z.boolean().optional().default(false)
});
