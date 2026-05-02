"use client";

import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../lib/api-client";

export function useAppointments(enabled = true) {
  return useQuery({
    queryKey: ["appointments"],
    enabled,
    queryFn: async () => {
      const res = await apiFetch("/api/appointments");
      if (!res.ok) throw new Error(await res.text());
      return res.json() as Promise<unknown[]>;
    }
  });
}
