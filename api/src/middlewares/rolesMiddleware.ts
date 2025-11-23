import { FastifyReply, FastifyRequest } from "fastify";

/**
 * Middleware de autorização baseado em papéis (roles).
 * Exemplo de uso:
 *   preHandler: [authGlobal, hasRole("ADMIN", "MANAGER")]
 */
export function hasRole(...allowedRoles: string[]) {
  return async function (request: FastifyRequest, reply: FastifyReply) {
    // Verifica se o usuário está autenticado
    if (!request.user) {
      return reply.status(401).send({
        error: "Usuário não autenticado",
      });
    }

    const userRole = request.user.role;

    // Verifica se o papel do usuário é permitido
    if (!allowedRoles.includes(userRole)) {
      return reply.status(403).send({
        error: "Acesso negado: permissão insuficiente",
      });
    }
  };
}
