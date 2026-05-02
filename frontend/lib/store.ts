"use client";

import { create } from "zustand";

type AppState = {
  role: "ADMIN" | "DOCTOR" | "NURSE" | "LAB" | "PHARMACY" | "FINANCE";
  setRole: (role: AppState["role"]) => void;
};

const roles = ["ADMIN", "DOCTOR", "NURSE", "LAB", "PHARMACY", "FINANCE"] as const;

function readStoredRole(): AppState["role"] {
  if (typeof window === "undefined") return "DOCTOR";
  const raw = localStorage.getItem("sihs_role");
  if (raw && (roles as readonly string[]).includes(raw)) return raw as AppState["role"];
  return "DOCTOR";
}

export const useAppStore = create<AppState>((set) => ({
  role: readStoredRole(),
  setRole: (role) => {
    if (typeof window !== "undefined") localStorage.setItem("sihs_role", role);
    set({ role });
  }
}));
