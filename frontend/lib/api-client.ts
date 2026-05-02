const STORAGE_ACCESS = "sihs_access_token";
const STORAGE_REFRESH = "sihs_refresh_token";

export const apiBase = typeof window !== "undefined"
  ? process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"
  : process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export function getTokens(): { access: string | null; refresh: string | null } {
  if (typeof window === "undefined") return { access: null, refresh: null };
  return {
    access: localStorage.getItem(STORAGE_ACCESS),
    refresh: localStorage.getItem(STORAGE_REFRESH)
  };
}

export function setTokens(access: string, refresh: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_ACCESS, access);
  localStorage.setItem(STORAGE_REFRESH, refresh);
}

export function clearTokens() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_ACCESS);
  localStorage.removeItem(STORAGE_REFRESH);
}

async function refreshSession(): Promise<boolean> {
  const { refresh } = getTokens();
  if (!refresh) return false;
  const res = await fetch(`${apiBase}/api/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken: refresh })
  });
  if (!res.ok) {
    clearTokens();
    return false;
  }
  const data = (await res.json()) as { accessToken: string; refreshToken: string };
  setTokens(data.accessToken, data.refreshToken);
  return true;
}

export async function apiFetch(path: string, init: RequestInit = {}): Promise<Response> {
  const headers = new Headers(init.headers);
  if (!headers.has("Content-Type") && init.body && !(init.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  const { access } = getTokens();
  if (access) headers.set("Authorization", `Bearer ${access}`);

  let res = await fetch(`${apiBase}${path}`, { ...init, headers });

  if (res.status === 401 && getTokens().refresh) {
    const ok = await refreshSession();
    if (ok) {
      const h2 = new Headers(init.headers);
      if (!h2.has("Content-Type") && init.body && !(init.body instanceof FormData)) {
        h2.set("Content-Type", "application/json");
      }
      const a = getTokens().access;
      if (a) h2.set("Authorization", `Bearer ${a}`);
      res = await fetch(`${apiBase}${path}`, { ...init, headers: h2 });
    }
  }

  return res;
}
