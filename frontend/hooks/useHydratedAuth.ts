"use client";

import { useEffect, useState } from "react";
import { getTokens } from "../lib/api-client";

export function useHydratedAuth() {
  const [ready, setReady] = useState(false);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    setHasToken(Boolean(getTokens().access));
    setReady(true);
  }, []);

  return { ready, hasToken };
}
