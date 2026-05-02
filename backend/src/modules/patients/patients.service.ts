import { prisma } from "../../common/utils/prisma.js";
import { createPatientSchema } from "./patients.schemas.js";
import type { z } from "zod";

export type CreatePatientInput = z.infer<typeof createPatientSchema>;

export const patientsService = {
  async list() {
    return prisma.patient.findMany({ orderBy: { createdAt: "desc" } });
  },

  async create(data: CreatePatientInput) {
    return prisma.patient.create({
      data: {
        name: data.name,
        dob: new Date(data.dob),
        gender: data.gender,
        contact: data.contact,
        nextOfKin: data.nextOfKin,
        nhifNumber: data.nhifNumber ?? null,
        shaMemberNumber: data.shaMemberNumber ?? null
      }
    });
  },

  async getById(id: string) {
    return prisma.patient.findUnique({
      where: { id },
      include: { records: true, appointments: true, labResults: true, prescriptions: true, billings: true }
    });
  }
};
