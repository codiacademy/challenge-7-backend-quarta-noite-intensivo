import { FastifyRequest, FastifyReply } from "fastify";
import prisma from "../utils/prisma";
import { hashPassword } from "../utils/hash";

export const userController = {
  
  async create(req: FastifyRequest, reply: FastifyReply) {
    
    const body = req.body as any;
    // validação minima (idealmente schemas)
    if (!body.name || !body.email || !body.password) {
      return reply.status(400).send({ error: "Campos obrigatórios ausentes" });
    }

    const passwordHash = await hashPassword(body.password);

    try {
      const user = await prisma.user.create({
        data: {
          name: body.name,
          email: body.email,
          password: passwordHash,
          role: body.role ?? "USER",
        },
        select: { id: true, name: true, email: true, role: true, createdAt: true },
      });

      return reply.status(201).send(user);
    } catch (err: any) {
      if (err.code === "P2002") return reply.status(409).send({ error: "Email já registrado" });
      throw err;
    }
  },

  async list(req: FastifyRequest, reply: FastifyReply) {
    const users = await prisma.user.findMany({ select: { id: true, name: true, email: true, role: true, createdAt: true } });
    return reply.send(users);
  },

  async find(req: FastifyRequest, reply: FastifyReply) {
    const id = Number((req.params as any).id);
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return reply.status(404).send({ error: "User not found" });
    // não retorna a senha
    const { password: _, ...u } = user as any;
    return reply.send(u);
  },

  async update(req: FastifyRequest, reply: FastifyReply) {
    const id = Number((req.params as any).id);
    const body = req.body as any;
    if (body.password) body.password = await hashPassword(body.password);
    const updated = await prisma.user.update({
      where: { id },data: body,select: { id: true, name: true, email: true, role: true, updatedAt: true },
    });
    return reply.send(updated);
  },

  async remove(req: FastifyRequest, reply: FastifyReply) {
    const id = Number((req.params as any).id);
    await prisma.user.delete({ where: { id } });
    return reply.status(204).send();
  },
};
