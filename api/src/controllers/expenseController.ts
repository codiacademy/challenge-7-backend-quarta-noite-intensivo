import { FastifyRequest, FastifyReply } from "fastify";
import { ExpenseService } from "../services/expenseService";

const service = new ExpenseService();

export class ExpenseController {

  async create(req: FastifyRequest, reply: FastifyReply) {
    try {
      const body = req.body as any;

      // Garantir tipos corretos
      if (!body.unitId || !body.categoryId || !body.value) {
        return reply.code(400).send({ message: "unitId, categoryId e value são obrigatórios" });
      }

      const expense = await service.create({
        ...body,
        unitId: Number(body.unitId),
        categoryId: Number(body.categoryId),
        value: Number(body.value),
        date: body.date ? new Date(body.date) : new Date()
      });

      return reply.code(201).send(expense);
    } catch (err: any) {
      return reply.code(err.statusCode || 500).send({ message: err.message || "Erro interno" });
    }
  }

  async list(req: FastifyRequest, reply: FastifyReply) {
    try {
      const query = req.query as any;

      const filter: any = {};
      if (query.unitId) filter.unitId = Number(query.unitId);
      if (query.from) filter.from = new Date(query.from);
      if (query.to) filter.to = new Date(query.to);

      const expenses = await service.list(filter);
      return reply.send(expenses);
    } catch (err: any) {
      return reply.code(err.statusCode || 500).send({ message: err.message || "Erro interno" });
    }
  }

  async get(req: FastifyRequest, reply: FastifyReply) {
    try {
      const id = Number((req.params as any).id);
      if (isNaN(id)) return reply.code(400).send({ message: "ID inválido" });

      const expense = await service.get(id);
      return reply.send(expense);
    } catch (err: any) {
      return reply.code(err.statusCode || 500).send({ message: err.message || "Erro interno" });
    }
  }

  async update(req: FastifyRequest, reply: FastifyReply) {
    try {
      const id = Number((req.params as any).id);
      if (isNaN(id)) return reply.code(400).send({ message: "ID inválido" });

      const body = req.body as any;
      if (body.unitId) body.unitId = Number(body.unitId);
      if (body.categoryId) body.categoryId = Number(body.categoryId);
      if (body.value) body.value = Number(body.value);
      if (body.date) body.date = new Date(body.date);

      const updated = await service.update(id, body);
      return reply.send(updated);
    } catch (err: any) {
      return reply.code(err.statusCode || 500).send({ message: err.message || "Erro interno" });
    }
  }

  async remove(req: FastifyRequest, reply: FastifyReply) {
    try {
      const id = Number((req.params as any).id);
      if (isNaN(id)) return reply.code(400).send({ message: "ID inválido" });

      await service.delete(id);
      return reply.code(204).send();
    } catch (err: any) {
      return reply.code(err.statusCode || 500).send({ message: err.message || "Erro interno" });
    }
  }
}
