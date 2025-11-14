import { FastifyReply, FastifyRequest } from "fastify";
import { CategoryService } from "../services/categoryService";
import { CreateCategoryInput, UpdateCategoryInput } from "../schemas/categorySchema";

const service = new CategoryService();

export class CategoryController {
  async create(req: FastifyRequest, reply: FastifyReply) {
    const data = req.body as CreateCategoryInput;
    const c = await service.create(data);
    return reply.code(201).send(c);
  }

  async list(req: FastifyRequest, reply: FastifyReply) {
    const list = await service.list();
    return reply.send(list);
  }

  async get(req: FastifyRequest, reply: FastifyReply) {
    const id = Number((req.params as any).id);
    const c = await service.get(id);
    return reply.send(c);
  }

  async update(req: FastifyRequest, reply: FastifyReply) {
    const id = Number((req.params as any).id);
    const data = req.body as UpdateCategoryInput;
    const c = await service.update(id, data);
    return reply.send(c);
  }

  async remove(req: FastifyRequest, reply: FastifyReply) {
    const id = Number((req.params as any).id);
    await service.delete(id);
    return reply.code(204).send();
  }
}
