import { prisma } from "../../common/utils/prisma.js";
import { createAppointmentSchema } from "./appointments.schemas.js";
import type { z } from "zod";

export type CreateAppointmentInput = z.infer<typeof createAppointmentSchema>;

export const appointmentsService = {
  async list() {
    return prisma.appointment.findMany({ orderBy: { datetime: "asc" } });
  },

  async create(data: CreateAppointmentInput) {
    const appointmentDate = new Date(data.datetime);

    if (!data.emergencyOverride) {
      const existing = await prisma.appointment.findFirst({
        where: { doctorId: data.doctorId, datetime: appointmentDate }
      });
      if (existing) {
        return { error: "DOUBLE_BOOK" as const };
      }
    }

    return prisma.appointment.create({
      data: {
        patientId: data.patientId,
        doctorId: data.doctorId,
        department: data.department,
        status: "SCHEDULED",
        datetime: appointmentDate,
        emergencyOverride: data.emergencyOverride
      }
    });
  }
};
