import { FastifyReply, FastifyRequest } from "fastify";
import { Roles, type Role }  from "../constants/roles";

export function authorizeRole(...allowedRoles: Role[]) {
  return async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const user = req.user as { role?: Role } | undefined;

      if (!user) {
        return reply.status(401).send({ error: "Não Autorizado" });
      }

      if (!allowedRoles.includes(user.role as Role)) {
        return reply.status(403).send({
          error: "Forbidden — permissões insuficientes",
          required: allowedRoles,
          userRole: user.role,
        });
      }
    } catch (error) {
      return reply.status(500).send({ error: "Erro no middleware" });
    }
  };
}
