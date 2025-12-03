import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";

const PUBLIC_ROUTES = [
  "/api/v1/auth/login",
  "/docs",
  "/docs/json",
];

export async function authGlobal(request: FastifyRequest, reply: FastifyReply) {
  if (PUBLIC_ROUTES.some((route) => request.url.startsWith(route))) {
    return;
  }

  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return reply.status(401).send({ error: "Token não fornecido" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    
    request.user = {
      id: decoded.id,
      role: decoded.role,
      email: decoded.email
};

  } catch (err) {
    return reply.status(401).send({ error: "Token inválido" });
  }
}
