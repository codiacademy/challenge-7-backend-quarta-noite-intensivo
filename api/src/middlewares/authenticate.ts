import { FastifyRequest, FastifyReply } from "fastify";
import jwt from "jsonwebtoken";

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return reply.status(401).send({ error: "Token não fornecido" });
    }

    const token = authHeader.replace("Bearer ", "");

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET não configurado no .env");
    }

    // Decodifica e valida
    const decoded = jwt.verify(token, secret) as { userId: string; role: string };

    // Anexa os dados ao request
    request.user = {
      id: decoded.userId,
      role: decoded.role,
    };

  } catch (err) {
    console.error("Erro na autenticação:", err);
    return reply.status(401).send({ error: "Token inválido ou expirado" });
  }
}
