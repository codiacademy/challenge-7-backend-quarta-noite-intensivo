import { FastifyError } from "fastify";

export function errorHandler(error: FastifyError, _request: any, reply: any) {
  // Zod
  if ((error as any).issues) {
    return reply.status(400).send({ error: "Erro na validação", details: (error as any).issues });
  }

  // Prisma unique constraint
  if ((error as any).code === "P2002") {
    return reply.status(409).send({ error: "Conflito", message: (error as any).meta?.target });
  }

  // Default
  const status = (error as any).statusCode || 500;
  reply.status(status).send({ error: error.message || "Erro no Servidor Interno" });
}
