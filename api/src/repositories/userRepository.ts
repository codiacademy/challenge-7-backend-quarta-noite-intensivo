import prisma from "../utils/prisma";
import { CreateUserInput, UpdateUserInput } from "../schemas/userSchema";

export class UserRepository {
  create(data: CreateUserInput) { return prisma.user.create({ data }); }
  findAll() { return prisma.user.findMany({ select: { id: true, name: true, email: true, role: true, createdAt: true } }); }
  findById(id: number) { return prisma.user.findUnique({ where: { id } }); }
  findByEmail(email: string) { return prisma.user.findUnique({ where: { email } }); }
  update(id: number, data: UpdateUserInput) { return prisma.user.update({ where: { id }, data }); }
  delete(id: number) { return prisma.user.delete({ where: { id } }); }
}
