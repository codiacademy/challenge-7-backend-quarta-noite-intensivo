import prisma from "../utils/prisma";
import { CreateUnitInput, UpdateUnitInput } from "../schemas/unitSchema";

export class UnitRepository {
  async create(data: CreateUnitInput) {
    return prisma.unit.create({ data });
  }

  async findAll() {
    return prisma.unit.findMany();
  }

  async findById(id: number) {
    return prisma.unit.findUnique({ where: { id } });
  }

  async update(id: number, data: UpdateUnitInput) {
    return prisma.unit.update({ where: { id }, data });
  }

  async delete(id: number) {
    return prisma.unit.delete({ where: { id } });
  }
}
