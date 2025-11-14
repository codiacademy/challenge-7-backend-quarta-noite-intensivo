import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed...");

  const passwordHash = await bcrypt.hash("123456", 10);

  // Usuários
  const admin = await prisma.user.create({
    data: {
      name: "Admin Codi",
      email: "admin@codi.test",
      password: passwordHash,
    },
  });

  const manager = await prisma.user.create({
    data: {
      name: "Manager BH",
      email: "manager@codi.test",
      password: passwordHash,
    },
  });

  const accountant = await prisma.user.create({
    data: {
      name: "Accountant SP",
      email: "accountant@codi.test",
      password: passwordHash,
    },
  });

  // Unidades
  const unit1 = await prisma.unit.create({
    data: {
      name: "Unidade Belo Horizonte",
      address: "BH, Centro",
    },
  });

  const unit2 = await prisma.unit.create({
    data: {
      name: "Unidade São Paulo",
      address: "SP, Barra",
    },
  });

  // Categorias
  const cat1 = await prisma.category.create({ data: { name: "Marketing" } });
  const cat2 = await prisma.category.create({ data: { name: "Infraestrutura" } });
  const cat3 = await prisma.category.create({ data: { name: "Operacional" } });

  // Vendas
  await prisma.sale.createMany({
    data: [
      {
        unitId: unit1.id,
        clientName: "João",
        quantity: 1,
        unitPrice: 500,
        totalPrice: 500,
        date: new Date(),
      },
      {
        unitId: unit1.id,
        clientName: "Maria",
        quantity: 1,
        unitPrice: 800,
        totalPrice: 800,
        date: new Date(),
      },
      {
        unitId: unit2.id,
        clientName: "Pedro",
        quantity: 1,
        unitPrice: 700,
        totalPrice: 700,
        date: new Date(),
      },
    ],
  });

  // Despesas
  await prisma.expense.createMany({
    data: [
      {
        unitId: unit1.id,
        categoryId: cat1.id,
        amount: 200,
        description: "Campanha ads",
        date: new Date(),
      },
      {
        unitId: unit2.id,
        categoryId: cat2.id,
        amount: 350,
        description: "Troca de ar",
        date: new Date(),
      },
      {
        unitId: unit1.id,
        categoryId: cat3.id,
        amount: 120,
        description: "Material de escritório",
        date: new Date(),
      },
    ],
  });

  console.log("🌱 Seed finalizado!");
}

main()
  .catch((e) => {
    console.error("❌ Erro no seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
