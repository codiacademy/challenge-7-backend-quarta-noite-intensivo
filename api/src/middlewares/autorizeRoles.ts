import { FastifyReply, FastifyRequest } from "fastify";
import { Role } from "@prisma/client";

export function authorizeRole(...allowedRoles: Role[]) {
  return async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const user = req.user;

      if (!user) {
        return reply.status(401).send({ error: "Unauthorized" });
      }

      if (!allowedRoles.includes(user.role)) {
        return reply.status(403).send({
          error: "Forbidden — insufficient permissions",
          required: allowedRoles,
          userRole: user.role,
        });
      }
    } catch (error) {
      return reply.status(500).send({ error: "Authorization middleware error" });
    }
  };
}
