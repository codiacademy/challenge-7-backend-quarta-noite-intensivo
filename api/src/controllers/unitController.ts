import { FastifyRequest, FastifyReply } from "fastify";
import { UnitService } from "../services/unitService";
const service = new UnitService();

export class UnitController {
  async create(req: FastifyRequest, reply: FastifyReply) {
     const body = req.body as any; 
     const u = await service.create(body);
      return reply.code(201).send(u); 
    }
  async list(_req: FastifyRequest, reply: FastifyReply) {
     return reply.send(await service.list());
     }
     
  async get(req: FastifyRequest, reply: FastifyReply) {
     const id = Number((req.params as any).id);
      return reply.send(await service.get(id));
     }

  async update(req: FastifyRequest, reply: FastifyReply){ 
    const id = Number((req.params as any).id); 
    const body = req.body as any; 
    return reply.send(await service.update(id, body)); 
  }

  async remove(req: FastifyRequest, reply: FastifyReply) { 
    const id = Number((req.params as any).id);
     await service.delete(id);
      return reply.code(204).send(); 
  }
}
