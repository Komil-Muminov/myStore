import { NextFunction, Request, Response } from "express";

import { login } from "./auth.service";
import { LoginInput } from "./auth.types";

export async function loginController(
  request: Request<Record<string, never>, Record<string, never>, LoginInput>,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const result = await login(request.body);
    response.json(result);
  } catch (error) {
    next(error);
  }
}
