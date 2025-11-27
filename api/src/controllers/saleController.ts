import { FastifyRequest, FastifyReply } from "fastify";
import { SaleService } from "../services/saleService";

const service = new SaleService();

export class SaleController {
  
  async create(req:FastifyRequest, reply:FastifyReply){
     const body = req.body as any;
     const s = await service.create(body);
      return reply.code(201).send(s); 
    }

  async list(req:FastifyRequest, reply:FastifyReply){
     const q = req.query as any;
     const filter:any = {}; 
     if(q.unitId) filter.unitId = Number(q.unitId); 
     if(q.from) filter.from = new Date(q.from); 
     if(q.to) filter.to = new Date(q.to);
     const list = await service.list(filter);
      return reply.send(list); 
    }

  async get(req:FastifyRequest, reply:FastifyReply){
     const id = Number((req.params as any).id); 
     const s = await service.get(id);
      return reply.send(s); 
    }

  async update(req:FastifyRequest, reply:FastifyReply){
     const id = Number((req.params as any).id);
     const body = req.body as any;
     const s = await service.update(id, body); 
     return reply.send(s); 
    }
    
  async remove(req:FastifyRequest, reply:FastifyReply){
     const id = Number((req.params as any).id); 
     await service.delete(id);
      return reply.code(204).send(); 
    }
}
