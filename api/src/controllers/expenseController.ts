import { FastifyRequest, FastifyReply } from "fastify";
import { ExpenseService } from "../services/expenseService";

const service = new ExpenseService();

export class ExpenseController {
  async create(req:FastifyRequest, reply:FastifyReply){ 
    const body = req.body as any; 
    const e = await service.create(body); 
    return reply.code(201).send(e); 
  }
  
    async list(req:FastifyRequest, reply:FastifyReply){ 
    const q = req.query as any;
    const filter:any={}; 
    if(q.unitId) filter.unitId = Number(q.unitId); 
    if(q.from) filter.from = new Date(q.from); 
    if(q.to) filter.to = new Date(q.to); 
      const list = await service.list(filter);
     return reply.send(list); 
  }

  async get(req:FastifyRequest, reply:FastifyReply){ 
    const id = Number((req.params as any).id); 
    const e = await service.get(id); 
        return reply.send(e);
   }

  async update(req:FastifyRequest, reply:FastifyReply){ 
    const id = Number((req.params as any).id); 
    const body = req.body as any; 
    const e = await service.update(id, body);
     return reply.send(e); 
    }

  async remove(req:FastifyRequest, reply:FastifyReply){ 
    const id = Number((req.params as any).id); 
    await service.delete(id); 
    return reply.code(204).send();
   }
}
