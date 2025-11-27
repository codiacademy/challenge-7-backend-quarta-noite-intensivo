// setup.ts
import prisma from "../utils/prisma";

/**
 * Limpa o banco para um estado inicial.
 * Pode ser chamada no beforeAll de qualquer suíte de teste.
 */
export async function setupTestDB() {
  await prisma.user.deleteMany();
  await prisma.sale.deleteMany();
  await prisma.unit.deleteMany();
  await prisma.category.deleteMany();
  await prisma.expense.deleteMany();
}

export async function closeTestDB() {
  await prisma.$disconnect();
}
