import { NextFunction, Request, Response } from "express";

import { AppError } from "../shared/app-error";

export function errorHandler(
  error: unknown,
  _request: Request,
  response: Response,
  _next: NextFunction,
): void {
  const isKnownError = error instanceof AppError;
  const statusCode = isKnownError ? error.statusCode : 500;
  const message = isKnownError ? error.message : "Internal server error.";

  if (!isKnownError) {
    console.error(error);
  }

  response.status(statusCode).json({ message });
}
