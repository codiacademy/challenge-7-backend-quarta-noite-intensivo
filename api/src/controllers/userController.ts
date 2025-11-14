import { FastifyReply, FastifyRequest } from "fastify";
import { UserService } from "../services/userService";
import { createUserSchema, updateUserSchema } from "../schemas/userSchema";

const service = new UserService();

export class UserController {
  async create(req: FastifyRequest, reply: FastifyReply) {
    const body = createUserSchema.parse(req.body);
    const user = await service.createUser(body);
    return reply.code(201).send(user);
  }

  async list(_req: FastifyRequest, reply: FastifyReply) {
    const list = await service.listUsers();
    return reply.send(list);
  }

  async get(req: FastifyRequest, reply: FastifyReply) {
    const id = Number((req.params as any).id);
    const u = await service.getUser(id);
    return reply.send(u);
  }

  async update(req: FastifyRequest, reply: FastifyReply) {
    const id = Number((req.params as any).id);
    const body = updateUserSchema.parse(req.body);
    const u = await service.updateUser(id, body);
    return reply.send(u);
  }

  async remove(req: FastifyRequest, reply: FastifyReply) {
    const id = Number((req.params as any).id);
    await service.deleteUser(id);
    return reply.code(204).send();
  }
}
