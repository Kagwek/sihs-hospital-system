"use client";

import { useMutation } from "@tanstack/react-query";
import { apiBase, clearTokens, setTokens } from "../lib/api-client";

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
  user: { id: string; name: string; email: string; role: string };
};

export function useLogin() {
  return useMutation({
    mutationFn: async (input: { email: string; password: string }) => {
      const res = await fetch(`${apiBase}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input)
      });
      const body = (await res.json().catch(() => ({}))) as Partial<LoginResponse> & { message?: string };
      if (!res.ok) throw new Error(typeof body.message === "string" ? body.message : "Login failed");
      const data = body as LoginResponse;
      setTokens(data.accessToken, data.refreshToken);
      return data;
    }
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: async () => {
      const raw = typeof window !== "undefined" ? localStorage.getItem("sihs_refresh_token") : null;
      if (raw) {
        await fetch(`${apiBase}/api/auth/logout`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken: raw })
        });
      }
      clearTokens();
    }
  });
}
