import { FastifyInstance } from "fastify";
import { authController } from "./authController";

export async function authRoutes(app: FastifyInstance) {
  app.post("/login", async (req, reply) =>
    authController.login(req, reply)
  );

  app.post("/refresh", async (req, reply) =>
    authController.refresh(req, reply)
  );
}
