"use client";

import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../lib/api-client";

export type AdminDashboard = {
  patientFlow: { totalPatients: number; todayAppointments: number };
  revenue: unknown;
  systemActivity: unknown[];
};

export function useAdminDashboard(enabled = true) {
  return useQuery({
    queryKey: ["admin", "dashboard"],
    enabled,
    queryFn: async () => {
      const res = await apiFetch("/api/admin/dashboard");
      if (!res.ok) throw new Error(await res.text());
      return res.json() as Promise<AdminDashboard>;
    }
  });
}
