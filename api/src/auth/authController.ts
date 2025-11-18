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

    return reply.status(200).send({
      message: "Login realizado com sucesso",
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
      user: result.user, // sem a senha
    });
  }

  async refresh(req: FastifyRequest, reply: FastifyReply) {
    const body = refreshSchema.parse(req.body);

    try {
      const data = await authService.refresh(body.refreshToken);

      return reply.status(200).send({
        message: "Token atualizado",
        accessToken: data.accessToken,
      });
    } catch (err) {
      return reply.status(401).send({ error: "Refresh token inválido" });
    }
  }
}

export const authController = new AuthController();
