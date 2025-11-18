import { FastifyReply, FastifyRequest } from "fastify";

export function isSelfOrAdmin() {
  return async function (req: FastifyRequest, reply: FastifyReply) {
    const user = req.user; // preenchido pelo authenticate()
    const targetId = req.params?.id; // ID vindo da rota

    if (!user) {
      return reply.status(401).send({ error: "Unauthorized" });
    }

    // Admin pode fazer tudo
    if (user.role === "admin") {
      return;
    }

    // Usuário comum só pode mexer nele mesmo
    if (user.id !== targetId) {
      return reply.status(403).send({
        error: "Forbidden: You can only manage your own account.",
      });
    }
  };
}
