import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";

const PUBLIC_ROUTES = [
  "/auth/login",
  "/docs",
  "/docs/json",
];

export async function authGlobal(request: FastifyRequest, reply: FastifyReply) {
  // Permite rotas públicas (sem autenticação)
  if (PUBLIC_ROUTES.some((route) => request.url.startsWith(route))) {
    return;
  }

  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return reply.status(401).send({ error: "Token não fornecido" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return reply.status(401).send({ error: "Token mal formatado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    // Tipagem correta do usuário no Fastify
    request.user = {
      id: (decoded as any).id,
      email: (decoded as any).email,
      role: (decoded as any).role,
    };
  } catch (err) {
    return reply.status(401).send({ error: "Token inválido" });
  }
}
