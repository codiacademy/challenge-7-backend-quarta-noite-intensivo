// tests/setup.ts
import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import prisma from "../utils/prisma";

const TEST_DB = path.resolve(process.cwd(), "dev.test.db");

export async function setupTestDB() {
  // garante que variáveis de ambiente de teste apontem para o DB de teste
  process.env.NODE_ENV = "test";
  process.env.DATABASE_URL = `file:${TEST_DB}`;

  // remove DB antigo se existir
  if (fs.existsSync(TEST_DB)) {
    fs.unlinkSync(TEST_DB);
  }

  // aplica o schema diretamente ao banco (sem migrations obrigatórias)
  // requer: npx prisma generate já ter sido executado pelo dev
  try {
    execSync("npx prisma db push", { stdio: "inherit" });
  } catch (err) {
    console.error("Erro ao executar `prisma db push`:", err);
    throw err;
  }

  // Cria seed mínimo via Prisma
  await seed();
}

async function seed() {
  // cria usuários de teste + unidade + category
  await prisma.user.create({
    data: {
      name: "Admin Test",
      email: "admin@test.local",
      password: await import("bcryptjs").then(m => m.hash("123456", 10)),
      role: "ADMIN",
    },
  });

  const unit1 = await prisma.unit.create({
    data: { name: "Unidade Teste", address: "Rua Teste, 1" },
  });

  const cat = await prisma.category.create({
    data: { name: "Marketing" },
  });

  // vendas e despesas exemplo
  await prisma.sale.createMany({
    data: [
      {
        unitId: unit1.id,
        clientName: "Cliente A",
        quantity: 1,
        unitPrice: 500,
        totalPrice: 500,
        date: new Date(),
      },
    ],
  });

  await prisma.expense.createMany({
    data: [
      {
        unitId: unit1.id,
        categoryId: cat.id,
        amount: 200,
        date: new Date(),
        description: "Despesa teste",
      },
    ],
  });
}
