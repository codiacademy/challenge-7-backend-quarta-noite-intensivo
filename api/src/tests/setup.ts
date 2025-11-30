import prisma from "../utils/prisma";

/**
 * Limpa o banco para um estado inicial.
 * Pode ser chamada no beforeAll de qualquer suíte de teste.
 */
export async function setupTestDB() {
  await prisma.$transaction([
    prisma.expense.deleteMany(),
    prisma.sale.deleteMany(),
    prisma.unit.deleteMany(),
    prisma.category.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  const admin = await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@test.local",
      password: "$2b$10$xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      role: "ADMIN",
    },
  });
}
export async function closeTestDB() {
  await prisma.$disconnect();
}
