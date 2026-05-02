"use client";

import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../lib/api-client";

export function useReportsAnalytics(enabled = true) {
  return useQuery({
    queryKey: ["reports", "analytics"],
    enabled,
    queryFn: async () => {
      const res = await apiFetch("/api/reports/analytics");
      if (!res.ok) throw new Error(await res.text());
      return res.json() as Promise<Record<string, number>>;
    }
  });
}
