import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: Number(process.env.PORT || 4000),
  databaseUrl: process.env.DATABASE_URL || "",
  jwtSecret: process.env.JWT_SECRET || "unsafe_dev_secret",
  accessTokenTtl: process.env.JWT_ACCESS_EXPIRES || "15m",
  refreshTokenDays: Number(process.env.REFRESH_TOKEN_DAYS || 7)
};
