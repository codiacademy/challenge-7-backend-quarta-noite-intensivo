import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const userController = {
  async create(
    req: FastifyRequest<{
      Body: {
        name: string;
        email: string;
        password: string;
        role?: string;
      };
    }>,
    reply: FastifyReply
  ) {
    const { name, email, password, role } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: passwordHash, role },
    });

    reply.code(201).send(user);
  },

  async list(req: FastifyRequest, reply: FastifyReply) {
    const users = await prisma.user.findMany();
    reply.send(users);
  },

  async find(
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    });

    if (!user) return reply.code(404).send({ message: "User not found" });

    reply.send(user);
  },

  async update(
    req: FastifyRequest<{
      Params: { id: string };
      Body: Record<string, any>;
    }>,
    reply: FastifyReply
  ) {
    const { id } = req.params;

    const updated = await prisma.user.update({
      where: { id: Number(id) },
      data: req.body,
    });

    reply.send(updated);
  },

  async remove(
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    const { id } = req.params;

    await prisma.user.delete({
      where: { id: Number(id) },
    });

    reply.code(204).send();
  },
};
