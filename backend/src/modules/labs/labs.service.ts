import { prisma } from "../../common/utils/prisma.js";
import { createLabSchema } from "./labs.schemas.js";
import type { z } from "zod";

export type CreateLabInput = z.infer<typeof createLabSchema> & { verifiedBy?: string | null };

export const labsService = {
  async list() {
    return prisma.labResult.findMany({ orderBy: { id: "desc" } });
  },

  async create(data: CreateLabInput) {
    if (data.status === "COMPLETE" && !data.verified) {
      return { error: "NEEDS_VERIFICATION" as const };
    }

    const lab = await prisma.labResult.create({
      data: {
        patientId: data.patientId,
        testType: data.testType,
        result: data.result,
        status: data.status,
        flaggedCritical: data.flaggedCritical,
        verifiedBy: data.verified ? data.verifiedBy ?? null : null,
        verifiedAt: data.verified ? new Date() : null
      }
    });

    if (lab.flaggedCritical) {
      await prisma.auditLog.create({
        data: {
          actorId: data.verifiedBy ?? null,
          action: "CRITICAL_LAB_ALERT",
          route: "/api/labs",
          method: "POST",
          payload: { labResultId: lab.id, patientId: lab.patientId, testType: lab.testType }
        }
      });
    }

    return lab;
  }
};
