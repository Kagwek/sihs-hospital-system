import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../../common/utils/prisma.js";
import { hashOpaqueToken, newRefreshTokenPlain } from "../../common/utils/tokenCrypto.js";
import { env } from "../../config/env.js";

function accessTokenFor(user: { id: string; email: string; role: string }) {
  return jwt.sign(
    { sub: user.id, role: user.role, email: user.email, typ: "access" },
    env.jwtSecret,
    { expiresIn: env.accessTokenTtl }
  );
}

export const authService = {
  async register(data: {
    name: string;
    email: string;
    role: "ADMIN" | "DOCTOR" | "NURSE" | "LAB" | "PHARMACY" | "FINANCE";
    department: string;
    password: string;
  }) {
    const passwordHash = await bcrypt.hash(data.password, 10);
    return prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        role: data.role,
        department: data.department,
        passwordHash
      },
      select: { id: true, name: true, email: true, role: true, department: true }
    });
  },

  async login(data: { email: string; password: string }) {
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user) return null;
    const ok = await bcrypt.compare(data.password, user.passwordHash);
    if (!ok) return null;

    const refreshPlain = newRefreshTokenPlain();
    const refreshHash = hashOpaqueToken(refreshPlain);
    const expiresAt = new Date(Date.now() + env.refreshTokenDays * 24 * 60 * 60 * 1000);

    await prisma.refreshToken.create({
      data: { userId: user.id, tokenHash: refreshHash, expiresAt }
    });

    return {
      accessToken: accessTokenFor(user),
      refreshToken: refreshPlain,
      expiresIn: env.accessTokenTtl,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    };
  },

  async refresh(refreshPlain: string) {
    const hash = hashOpaqueToken(refreshPlain);
    const row = await prisma.refreshToken.findUnique({ where: { tokenHash: hash } });
    if (!row || row.revokedAt || row.expiresAt < new Date()) {
      return null;
    }

    const user = await prisma.user.findUnique({ where: { id: row.userId } });
    if (!user) return null;

    await prisma.refreshToken.update({
      where: { id: row.id },
      data: { revokedAt: new Date() }
    });

    const newPlain = newRefreshTokenPlain();
    const newHash = hashOpaqueToken(newPlain);
    const expiresAt = new Date(Date.now() + env.refreshTokenDays * 24 * 60 * 60 * 1000);
    await prisma.refreshToken.create({
      data: { userId: user.id, tokenHash: newHash, expiresAt }
    });

    return {
      accessToken: accessTokenFor(user),
      refreshToken: newPlain,
      expiresIn: env.accessTokenTtl,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    };
  },

  async logout(refreshPlain: string) {
    const hash = hashOpaqueToken(refreshPlain);
    const row = await prisma.refreshToken.findUnique({ where: { tokenHash: hash } });
    if (!row) return false;
    await prisma.refreshToken.update({
      where: { id: row.id },
      data: { revokedAt: new Date() }
    });
    return true;
  }
};
