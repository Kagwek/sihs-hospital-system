import { prisma } from "../../common/utils/prisma.js";
import { createRecordSchema } from "./records.schemas.js";
import type { z } from "zod";

export type CreateRecordInput = z.infer<typeof createRecordSchema> & { createdBy: string };

export const recordsService = {
  async list() {
    return prisma.medicalRecord.findMany({ orderBy: { timestamp: "desc" } });
  },

  async create(data: CreateRecordInput) {
    return prisma.medicalRecord.create({
      data: {
        patientId: data.patientId,
        diagnosis: data.diagnosis,
        notes: data.notes,
        createdBy: data.createdBy
      }
    });
  }
};
