"use client";

import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../lib/api-client";

export function useBillingList(enabled = true) {
  return useQuery({
    queryKey: ["billing"],
    enabled,
    queryFn: async () => {
      const res = await apiFetch("/api/billing");
      if (!res.ok) throw new Error(await res.text());
      return res.json() as Promise<unknown[]>;
    }
  });
}
