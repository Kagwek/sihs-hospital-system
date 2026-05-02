import { prisma } from "../../common/utils/prisma.js";

export const reportingService = {
  async analytics() {
    const [patients, appointments, completedLabs, paidInvoices] = await Promise.all([
      prisma.patient.count(),
      prisma.appointment.count(),
      prisma.labResult.count({ where: { status: "COMPLETE" } }),
      prisma.billing.count({ where: { status: "PAID" } })
    ]);
    return { patients, appointments, completedLabs, paidInvoices };
  }
};
