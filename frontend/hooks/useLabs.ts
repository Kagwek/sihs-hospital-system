"use client";

import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../lib/api-client";

export function useLabs(enabled = true) {
  return useQuery({
    queryKey: ["labs"],
    enabled,
    queryFn: async () => {
      const res = await apiFetch("/api/labs");
      if (!res.ok) throw new Error(await res.text());
      return res.json() as Promise<unknown[]>;
    }
  });
}
