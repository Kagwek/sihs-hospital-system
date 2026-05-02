import { createHash, randomBytes } from "crypto";

export function hashOpaqueToken(plain: string): string {
  return createHash("sha256").update(plain, "utf8").digest("hex");
}

export function newRefreshTokenPlain(): string {
  return randomBytes(48).toString("hex");
}
