import { FastifyReply, FastifyRequest } from "fastify";
import { UnitService } from "../services/unitService";
import { CreateUnitInput, UpdateUnitInput } from "../schemas/unitSchema";

const service = new UnitService();

export class UnitController {
  async create(req: FastifyRequest, reply: FastifyReply) {
    const data = req.body as CreateUnitInput;
    const unit = await service.create(data);
    return reply.code(201).send(unit);
  }

  async list(req: FastifyRequest, reply: FastifyReply) {
    const units = await service.list();
    return reply.send(units);
  }

  async get(req: FastifyRequest, reply: FastifyReply) {
    const id = Number((req.params as any).id);
    const unit = await service.get(id);
    return reply.send(unit);
  }

  async update(req: FastifyRequest, reply: FastifyReply) {
    const id = Number((req.params as any).id);
    const data = req.body as UpdateUnitInput;
    const unit = await service.update(id, data);
    return reply.send(unit);
  }

  async remove(req: FastifyRequest, reply: FastifyReply) {
    const id = Number((req.params as any).id);
    await service.delete(id);
    return reply.code(204).send();
  }
}
