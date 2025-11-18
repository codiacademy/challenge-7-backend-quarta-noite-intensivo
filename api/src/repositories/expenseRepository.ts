import prisma from "../utils/prisma";
import { CreateExpenseInput, UpdateExpenseInput } from "../schemas/expenseSchema";
export class ExpenseRepository {
  create(data: CreateExpenseInput & { date: Date }) { return prisma.expense.create({ data }); }
  findAll(filter?: any) {
    const where:any = {};
    if(filter?.unitId) where.unitId = filter.unitId;
    if(filter?.from || filter?.to){ where.date = {}; if(filter.from) where.date.gte = filter.from; if(filter.to) where.date.lte = filter.to; }
    return prisma.expense.findMany({ where, orderBy:{ date: "desc" } });
  }
  findById(id:number){ return prisma.expense.findUnique({ where:{ id } }); }
  update(id:number, data: Partial<UpdateExpenseInput & { date?:Date }>) { return prisma.expense.update({ where:{ id }, data }); }
  delete(id:number) { return prisma.expense.delete({ where:{ id } }); }
}
