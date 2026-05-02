import { prisma } from "../../common/utils/prisma.js";
import { prescribeSchema } from "./pharmacy.schemas.js";
import type { z } from "zod";

export type PrescribeInput = z.infer<typeof prescribeSchema> & { doctorId: string };

export const pharmacyService = {
  async list() {
    return prisma.prescription.findMany({ orderBy: { id: "desc" } });
  },

  async prescribe(data: PrescribeInput) {
    return prisma.prescription.create({
      data: {
        patientId: data.patientId,
        doctorId: data.doctorId,
        medication: data.medication,
        dosage: data.dosage,
        instructions: data.instructions
      }
    });
  },

  async dispense(prescriptionId: string, actorId?: string) {
    const prescription = await prisma.prescription.findUnique({ where: { id: prescriptionId } });
    if (!prescription) return { error: "NOT_FOUND" as const };

    await prisma.auditLog.create({
      data: {
        action: "DRUG_DISPENSED",
        actorId: actorId ?? null,
        route: `/api/pharmacy/dispense/${prescriptionId}`,
        method: "POST",
        payload: { prescriptionId }
      }
    });

    return { ok: true as const };
  }
};
