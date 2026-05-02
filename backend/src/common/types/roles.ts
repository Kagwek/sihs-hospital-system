export const Roles = {
  ADMIN: "ADMIN",
  DOCTOR: "DOCTOR",
  NURSE: "NURSE",
  LAB: "LAB",
  PHARMACY: "PHARMACY",
  FINANCE: "FINANCE"
} as const;

export type Role = (typeof Roles)[keyof typeof Roles];
