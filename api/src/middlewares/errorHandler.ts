import { FastifyReply, FastifyRequest } from "fastify";

export function errorHandler(error: any, req: FastifyRequest, reply: FastifyReply) {
  if (error?.statusCode) {
    return reply.status(error.statusCode).send({ message: error.message });
  }
  console.error(error);
  return reply.status(500).send({ message: "Internal server error" });
}
