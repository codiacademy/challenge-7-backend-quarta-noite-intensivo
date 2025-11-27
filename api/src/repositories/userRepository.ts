import prisma from "../utils/prisma";
import type { CreateUserDTO, UpdateUserDTO } from "../schemas/userSchema";
import { createUserSchema } from "../schemas/userSchema";

export class UserRepository {
  create(data: CreateUserDTO) { 
    
    const validated = createUserSchema.parse(data);

    return prisma.user.create({ data:{ 
      name: validated.name, 
      email: validated.email, 
      password: validated.password, 
      role: validated.role }
     }); 
  }
  findAll() { 
    return prisma.user.findMany({ select: { id: true, name: true, email: true, role: true, createdAt: true } }); 
  }
  findById(id: number) { 
    return prisma.user.findUnique({ where: { id } }); 
  }
  findByEmail(email: string) { 
    return prisma.user.findUnique({ where: { email } }); 
  }
  update(id: number, data: UpdateUserDTO) {
     return prisma.user.update({ where: { id }, data }); 
  }
  delete(id: number) { 
    return prisma.user.delete({ where: { id } }); 
  }
}
