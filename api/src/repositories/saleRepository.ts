import prisma from "../utils/prisma";
import { CreateSaleInput, UpdateSaleInput } from "../schemas/saleSchema";

export class SaleRepository {
  async create(data: CreateSaleInput & { totalPrice: number }) {
    return prisma.sale.create({ data });
  }

  async findAll(filter?: { unitId?: number; from?: Date; to?: Date }) {
    const where: any = {};
    if (filter?.unitId) where.unitId = filter.unitId;
    if (filter?.from || filter?.to) {
      where.date = {};
      if (filter.from) where.date.gte = filter.from;
      if (filter.to) where.date.lte = filter.to;
    }
    return prisma.sale.findMany({ where, orderBy: { date: "desc" } });
  }

  async findById(id: number) {
    return prisma.sale.findUnique({ where: { id } });
  }

  async update(id: number, data: UpdateSaleInput & { totalPrice?: number }) {
    return prisma.sale.update({ where: { id }, data });
  }

  async delete(id: number) {
    return prisma.sale.delete({ where: { id } });
  }
}
