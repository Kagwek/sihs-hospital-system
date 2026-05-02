"use client";

import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../lib/api-client";

export function usePharmacyPrescriptions(enabled = true) {
  return useQuery({
    queryKey: ["pharmacy", "prescriptions"],
    enabled,
    queryFn: async () => {
      const res = await apiFetch("/api/pharmacy");
      if (!res.ok) throw new Error(await res.text());
      return res.json() as Promise<unknown[]>;
    }
  });
}
