"use client";

import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../lib/api-client";

export function useMedicalRecords(enabled = true) {
  return useQuery({
    queryKey: ["records"],
    enabled,
    queryFn: async () => {
      const res = await apiFetch("/api/records");
      if (!res.ok) throw new Error(await res.text());
      return res.json() as Promise<unknown[]>;
    }
  });
}
