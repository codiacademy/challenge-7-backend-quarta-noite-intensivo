import { FastifyRequest, FastifyReply } from "fastify";
import { verifyToken } from "./verifyToken";

export async function authGuard(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return reply.status(401).send({ error: "Token não enviado" });
  }

  const token = header.replace("Bearer ", "");

  const decoded = verifyToken(token);

  if (!decoded) {
    return reply.status(401).send({ error: "Token inválido" });
  }

  // Disponibiliza o userId dentro da request
  // @ts-ignore
  req.user = decoded;

  return;
}
