import { FastifyInstance } from "fastify";
import { authController } from "../auth/authController";

export async function authRoutes(app: FastifyInstance) {
  app.post("/auth/login", { schema: { tags: ["Auth"] } }, (req, reply) => authController.login(req, reply));
  app.post("/auth/refresh", { schema: { tags: ["Auth"] } }, (req, reply) => authController.refresh(req, reply));
}
