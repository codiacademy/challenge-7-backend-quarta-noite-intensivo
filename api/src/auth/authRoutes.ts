import { FastifyInstance } from "fastify";
import{ authController } from "./authController";

export async function authRoutes(app: FastifyInstance) {
  app.post("/login", authController.login);
  app.post("/refresh", authController.refresh);
}

