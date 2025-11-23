import { FastifyReply, FastifyRequest } from "fastify";

export function isSelfOrAdmin() {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const user = request.user;
    const targetId = (request.params as any)?.id;
    if (!user) return reply.status(401).send({ error: "Unauthorized" });

    if (user.role === "ADMIN") return;

    if (!targetId) return reply.status(400).send({ error: "Missing param id" });

    // params are strings; user.id is number
    if (Number(targetId) !== Number(user.id)) {
      return reply.status(403).send({ error: "Forbidden: You can only manage your own account." });
    }
  };
}
