import { z } from "zod";

export const createBillingSchema = z.object({
  patientId: z.string(),
  service: z.string(),
  amount: z.number().positive(),
  status: z.enum(["PENDING", "PAID", "PARTIAL"]),
  payorType: z.enum(["CASH", "NHIF", "SHA", "PRIVATE", "CORPORATE"]).optional(),
  nhifNumber: z.string().optional(),
  shaMemberNumber: z.string().optional(),
  privateInsurerName: z.string().optional(),
  policyNumber: z.string().optional(),
  insuranceClaimStatus: z
    .enum([
      "NOT_APPLICABLE",
      "PENDING_VERIFICATION",
      "SUBMITTED_TO_NHIF",
      "SUBMITTED_TO_SHA",
      "SUBMITTED_PRIVATE",
      "APPROVED",
      "PARTIALLY_APPROVED",
      "REJECTED",
      "SETTLED"
    ])
    .optional(),
  patientCopayKes: z.number().nonnegative().optional(),
  insurerApprovedKes: z.number().nonnegative().optional(),
  claimNotes: z.string().optional()
});
