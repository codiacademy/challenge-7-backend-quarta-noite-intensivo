import prisma from "../utils/prisma";
import { CreateCategoryInput, UpdateCategoryInput } from "../schemas/categorySchema";

export class CategoryRepository {
  async create(data: CreateCategoryInput) {
    return prisma.category.create({ data });
  }

  async findAll() {
    return prisma.category.findMany();
  }

  async findById(id: number) {
    return prisma.category.findUnique({ where: { id } });
  }

  async update(id: number, data: UpdateCategoryInput) {
    return prisma.category.update({ where: { id }, data });
  }

  async delete(id: number) {
    return prisma.category.delete({ where: { id } });
  }
}
