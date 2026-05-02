"use client";

import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../lib/api-client";

export function usePatients(enabled = true) {
  return useQuery({
    queryKey: ["patients"],
    enabled,
    queryFn: async () => {
      const res = await apiFetch("/api/patients");
      if (!res.ok) throw new Error(await res.text());
      return res.json() as Promise<unknown[]>;
    }
  });
}

export function usePatient(id: string | undefined, enabled = true) {
  return useQuery({
    queryKey: ["patients", id],
    enabled: enabled && Boolean(id),
    queryFn: async () => {
      const res = await apiFetch(`/api/patients/${id}`);
      if (!res.ok) throw new Error(await res.text());
      return res.json() as Promise<unknown>;
    }
  });
}
