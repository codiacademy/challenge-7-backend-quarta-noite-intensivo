import { FastifyReply, FastifyRequest } from "fastify";
import { authService } from "./authService";
import { loginSchema, refreshSchema } from "./schemas";

export class AuthController {
  async login(req: FastifyRequest, reply: FastifyReply) {
    const body = loginSchema.parse(req.body);

    const result = await authService.login(body.email, body.password);

    if (!result) {
      return reply.status(401).send({ error: "Credenciais inválidas" });
    }

    return reply.send(result);
  }

  async refresh(req: FastifyRequest, reply: FastifyReply) {
    const body = refreshSchema.parse(req.body);

    try {
      const data = await authService.refresh(body.refreshToken);
      return reply.send(data);
    } catch {
      return reply.status(401).send({ error: "Refresh token inválido" });
    }
  }
}

export const authController = new AuthController();
