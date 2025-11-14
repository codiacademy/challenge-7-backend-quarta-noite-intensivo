import prisma from "../utils/prisma";
import { CreateExpenseInput, UpdateExpenseInput } from "../schemas/expenseSchema";

export class ExpenseRepository {
  async create(data: CreateExpenseInput) {
    return prisma.expense.create({ data });
  }

  async findAll(filter?: { unitId?: number; from?: Date; to?: Date }) {
    const where: any = {};
    if (filter?.unitId) where.unitId = filter.unitId;
    if (filter?.from || filter?.to) {
      where.date = {};
      if (filter.from) where.date.gte = filter.from;
      if (filter.to) where.date.lte = filter.to;
    }
    return prisma.expense.findMany({ where, orderBy: { date: "desc" } });
  }

  async findById(id: number) {
    return prisma.expense.findUnique({ where: { id } });
  }

  async update(id: number, data: UpdateExpenseInput) {
    return prisma.expense.update({ where: { id }, data });
  }

  async delete(id: number) {
    return prisma.expense.delete({ where: { id } });
  }
}
