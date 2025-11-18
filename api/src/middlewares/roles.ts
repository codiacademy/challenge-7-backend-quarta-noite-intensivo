import { FastifyReply, FastifyRequest } from "fastify";

/**
 * Middleware para verificar se o usuário tem um dos papéis permitidos.
 * Exemplo de uso: preHandler: [authenticate, hasRole("ADMIN", "MANAGER")]
 */
export function hasRole(...allowedRoles: string[]) {
  return async function (request: FastifyRequest, reply: FastifyReply) {
    if (!request.user) {
      return reply.status(401).send({ error: "Usuário não autenticado" });
    }

    const userRole = request.user.role;

    if (!allowedRoles.includes(userRole)) {
      return reply.status(403).send({ error: "Acesso negado: permissão insuficiente" });
    }
  };
}
