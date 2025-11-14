import { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

export default async function userRoutes(app: FastifyInstance) {
  
  const userBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
  });

  app.post("/", {
    schema: {
      tags: ["Users"],
      summary: "Criar usuário",
      body: {
        type: "object",
        required: ["name", "email", "password"],
        properties: {
          name: { type: "string" },
          email: { type: "string" },
          password: { type: "string" },
        }
      },
      response: {
        201: {
          description: "Usuário criado",
          type: "object",
          properties: {
            id: { type: "number" },
            name: { type: "string" },
            email: { type: "string" },
          }
        }
      }
    }
  }, async (req, reply) => {
    const data = userBodySchema.parse(req.body);

    const user = await prisma.user.create({
      data,
      select: { id: true, name: true, email: true }
    });

    return reply.code(201).send(user);
  });

  app.get("/", {
    schema: {
      tags: ["Users"],
      summary: "Listar usuários",
      response: {
        200: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "number" },
              name: { type: "string" },
              email: { type: "string" },
            }
          }
        }
      }
    }
  }, async () => {
    return prisma.user.findMany({
      select: { id: true, name: true, email: true }
    });
  });

}
