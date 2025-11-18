import prisma from "../utils/prisma";
import { CreateCategoryInput, UpdateCategoryInput } from "../schemas/categorySchema";
export class CategoryRepository {
  create(data: CreateCategoryInput) { return prisma.category.create({ data }); }
  findAll() { return prisma.category.findMany(); }
  findById(id: number) { return prisma.category.findUnique({ where: { id } }); }
  update(id: number, data: UpdateCategoryInput) { return prisma.category.update({ where: { id }, data }); }
  delete(id: number) { return prisma.category.delete({ where: { id } }); }
}
