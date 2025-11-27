import { FastifyError } from "fastify";

export function errorHandler(error: FastifyError, _request: any, reply: any) {
  // Zod
  if ((error as any).issues) {
    return reply.status(400).send({ error: "Erro na validação", details: (error as any).issues });
  }

  // Prisma 
  if ((error as any).code === "P2002") {
    return reply.status(409).send({ error: "Erro", message: (error as any).meta?.target });
  }

  // Padrão
  const status = (error as any).statusCode || 500;
  reply.status(status).send({ error: error.message || "Erro no Servidor Interno" });
}
