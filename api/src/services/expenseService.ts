import { prisma } from "../utils/prisma"; // ajuste conforme seu setup

export class ExpenseService {
  async create(data: any) {
    // Validação básica
    if (!data.unitId || !data.categoryId || !data.value) {
      throw { statusCode: 400, message: "unitId, categoryId e value são obrigatórios" };
    }

    // Checar existência de unit e category
    const unit = await prisma.unit.findUnique({ where: { id: Number(data.unitId) } });
    if (!unit) throw { statusCode: 400, message: "Unidade não encontrada" };

    const category = await prisma.category.findUnique({ where: { id: Number(data.categoryId) } });
    if (!category) throw { statusCode: 400, message: "Categoria não encontrada" };

    const date = data.date ? new Date(data.date) : new Date();
    return prisma.expense.create({ data: { ...data, date } });
  }

  async list(filter?: any) {
    const where: any = {};
    if (filter?.unitId) where.unitId = Number(filter.unitId);
    if (filter?.from) where.date = { gte: new Date(filter.from) };
    if (filter?.to) where.date = { ...where.date, lte: new Date(filter.to) };
    return prisma.expense.findMany({ where });
  }

  async get(id: number) {
    const e = await prisma.expense.findUnique({ where: { id } });
    if (!e) throw { statusCode: 404, message: "Despesa não encontrada" };
    return e;
  }

  async update(id: number, data: any) {
    await this.get(id); // valida existência
    const updateData: any = { ...data };
    if (data.date) updateData.date = new Date(data.date);
    return prisma.expense.update({ where: { id }, data: updateData });
  }

  async delete(id: number) {
    await this.get(id); // valida existência
    return prisma.expense.delete({ where: { id } });
  }
}
