import prisma from "../utils/prisma";
import type { CreateCategoryInput, UpdateCategoryInput } from "../schemas/categorySchema";
import { createCategorySchema } from "../schemas/categorySchema";

export class CategoryRepository {

  create(data: CreateCategoryInput) { 
    
    const validated = createCategorySchema.parse(data);
    
    return prisma.category.create({ data: {
      name: validated.name
    } });
}
  findAll() {
     return prisma.category.findMany(); 
    }

  findById(id: number) {
     return prisma.category.findUnique({ where: { id } }); 
    }

  update(id: number, data: UpdateCategoryInput) { 
    return prisma.category.update({ where: { id }, data });
   }

  delete(id: number) { 
    return prisma.category.delete({ where: { id } });
   }
   
}
