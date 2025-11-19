import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";
import { env } from "../utils/env";

const PUBLIC_ROUTES = [
  "/api/v1/auth/login",
  "/api/v1/auth/refresh",
  "/api/v1/docs",
  "/api/v1/docs/json",
];

export async function authGlobal(request: FastifyRequest, reply: FastifyReply) {
  // Allow public routes
  if (PUBLIC_ROUTES.some((r) => request.url.startsWith(r))) return;

  const authHeader = request.headers.authorization;
  if (!authHeader) return reply.status(401).send({ error: "Token não fornecido" });

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return reply.status(401).send({ error: "Token mal formatado" });
  }
  const token = parts[1];

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as { id: number; email?: string; role?: string };
    request.user = {
      id: decoded.id,
      email: decoded.email ?? "",
      role: decoded.role ?? "USER",
    };
  } catch (err) {
    return reply.status(401).send({ error: "Token inválido" });
  }
}
