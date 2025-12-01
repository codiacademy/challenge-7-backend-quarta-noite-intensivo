import prisma from "../utils/prisma";

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

  const unit = await prisma.unit.create({
    data: { name: "Default Unit" },
  });

  const category = await prisma.category.create({
    data: { name: "Default Category" },
  });

  return { admin, unit, category };
}

export async function closeTestDB() {
  await prisma.$disconnect();
}
