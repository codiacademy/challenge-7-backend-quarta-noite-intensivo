import { FastifyReply, FastifyRequest } from "fastify";

export function hasRole(...allowedRoles: string[]) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    if (!request.user) return reply.status(401).send({ error: "Usuário não autenticado" });
    if (!allowedRoles.includes(request.user.role)) {
      return reply.status(403).send({ error: "Acesso negado: permissão insuficiente" });
    }
  };
}
