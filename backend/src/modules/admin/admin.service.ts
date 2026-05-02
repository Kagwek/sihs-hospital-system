import { prisma } from "../../common/utils/prisma.js";

export const adminService = {
  async dashboard() {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const [patientCount, appointmentsToday, revenueRaw, recentAudits] = await Promise.all([
      prisma.patient.count(),
      prisma.appointment.count({
        where: { datetime: { gte: start, lte: end } }
      }),
      prisma.billing.aggregate({ _sum: { amount: true } }),
      prisma.auditLog.findMany({ take: 20, orderBy: { createdAt: "desc" } })
    ]);

    return {
      patientFlow: { totalPatients: patientCount, todayAppointments: appointmentsToday },
      revenue: revenueRaw._sum.amount ?? 0,
      systemActivity: recentAudits
    };
  }
};
