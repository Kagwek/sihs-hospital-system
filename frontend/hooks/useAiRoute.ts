"use client";

import { useMutation } from "@tanstack/react-query";
import { apiFetch } from "../lib/api-client";

export type AiRouteInput = {
  symptoms: string[];
  vitals: {
    systolicBP?: number;
    diastolicBP?: number;
    bmi?: number;
    hasDiabetes?: boolean;
  };
};

export type AiRouteResult = {
  recommendedDepartment: string;
  urgencyLevel: "RED" | "AMBER" | "GREEN";
  rationale: string;
};

export function useAiRoute() {
  return useMutation({
    mutationFn: async (input: AiRouteInput) => {
      const res = await apiFetch("/api/ai/route", {
        method: "POST",
        body: JSON.stringify(input)
      });
      if (!res.ok) throw new Error(await res.text());
      return res.json() as Promise<AiRouteResult>;
    }
  });
}
