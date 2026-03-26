import cors from "cors";
import express from "express";

import { errorHandler } from "./middlewares/error-handler";
import { notFoundHandler } from "./middlewares/not-found-handler";
import { authRouter } from "./modules/auth/auth.routes";

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get("/api/health", (_request, response) => {
    response.json({ status: "ok" });
  });

  app.use("/api/auth", authRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
