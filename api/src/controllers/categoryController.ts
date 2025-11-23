import { FastifyRequest, FastifyReply } from "fastify";
import { CategoryService } from "../services/categoryService";

const service = new CategoryService();

export class CategoryController {
  async create(req:FastifyRequest, reply:FastifyReply){
     const body = req.body as any;
     const c = await service.create(body); 
        return reply.code(201).send(c); 
      }

  async list(_req:FastifyRequest, reply:FastifyReply){
     return reply.send(await service.list()); 
    }

  async get(req:FastifyRequest, reply:FastifyReply){ 
    const id = Number((req.params as any).id);
     return reply.send(await service.get(id)); 
    }

  async update(req:FastifyRequest, reply:FastifyReply){ 
    const id = Number((req.params as any).id);
    const body = req.body as any; 
      return reply.send(await service.update(id,body));
     }
     
  async remove(req:FastifyRequest, reply:FastifyReply){
     const id = Number((req.params as any).id); 
     await service.delete(id); 
     return reply.code(204).send();
   }
}
