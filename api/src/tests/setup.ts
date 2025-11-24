import prisma from "../src/utils/prisma";

beforeAll(async () => {
  // Limpar tabelas antes dos testes
  await prisma.user.deleteMany();
  await prisma.sale.deleteMany();
  await prisma.unit.deleteMany();
  await prisma.category.deleteMany();
  await prisma.expense.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});
