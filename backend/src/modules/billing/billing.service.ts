import { Prisma } from "@prisma/client";
import { prisma } from "../../common/utils/prisma.js";
import { createBillingSchema } from "./billing.schemas.js";
import type { z } from "zod";

export type CreateBillingInput = z.infer<typeof createBillingSchema>;

export const billingService = {
  async list() {
    return prisma.billing.findMany({ orderBy: { id: "desc" } });
  },

  async create(data: CreateBillingInput) {
    const payorType = data.payorType ?? "CASH";
    const insuranceClaimStatus = data.insuranceClaimStatus ?? "NOT_APPLICABLE";

    return prisma.billing.create({
      data: {
        patientId: data.patientId,
        service: data.service,
        amount: new Prisma.Decimal(data.amount),
        status: data.status,
        payorType,
        nhifNumber: data.nhifNumber ?? null,
        shaMemberNumber: data.shaMemberNumber ?? null,
        privateInsurerName: data.privateInsurerName ?? null,
        policyNumber: data.policyNumber ?? null,
        insuranceClaimStatus,
        patientCopayKes: data.patientCopayKes != null ? new Prisma.Decimal(data.patientCopayKes) : null,
        insurerApprovedKes: data.insurerApprovedKes != null ? new Prisma.Decimal(data.insurerApprovedKes) : null,
        claimNotes: data.claimNotes ?? null
      }
    });
  }
};
