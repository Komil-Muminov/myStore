import dotenv from "dotenv";

dotenv.config();

function parsePort(value: string | undefined): number {
  const parsedValue = Number(value);
  return Number.isInteger(parsedValue) && parsedValue > 0 ? parsedValue : 4000;
}

export const env = {
  port: parsePort(process.env.PORT),
  jwtSecret: process.env.JWT_SECRET || "change-me-in-production",
  defaultUserEmail: process.env.DEFAULT_USER_EMAIL || "admin@example.com",
  defaultUserPassword: process.env.DEFAULT_USER_PASSWORD || "admin12345",
};
