import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

export const prisma = new PrismaClient();

export async function setupTestDB() {
  // Reseta completamente o banco
  await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE
      "Expense",
      "Sale",
      "Unit",
      "Category",
      "User"
    RESTART IDENTITY CASCADE;
  `);

  // Cria usuário admin padrão
  const passwordHash = await bcrypt.hash("123456", 10);

  await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@admin.com",
      password: passwordHash,
      role: "ADMIN"
    }
  });
}

export async function disconnectDB() {
  await prisma.$disconnect();
}
