import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { env } from "../../config/env";
import { AppError } from "../../shared/app-error";
import { findUserByEmail } from "./auth.repository";
import { LoginInput, LoginResponse } from "./auth.types";

export async function login({
  email,
  password,
}: LoginInput): Promise<LoginResponse> {
  const normalizedEmail = String(email || "").trim().toLowerCase();
  const normalizedPassword = String(password || "");

  if (!normalizedEmail || !normalizedPassword) {
    throw new AppError("Email and password are required.", 400);
  }

  const user = await findUserByEmail(normalizedEmail);

  if (!user) {
    throw new AppError("Invalid email or password.", 401);
  }

  const isPasswordValid = await bcrypt.compare(
    normalizedPassword,
    user.passwordHash,
  );

  if (!isPasswordValid) {
    throw new AppError("Invalid email or password.", 401);
  }

  const token = jwt.sign(
    {
      sub: user.id,
      email: user.email,
    },
    env.jwtSecret,
    {
      expiresIn: "1d",
    },
  );

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  };
}
