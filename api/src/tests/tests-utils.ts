import { buildApp } from "../app";         
import { prisma } from "./prisma-test-env";

export async function build() {
  const app = await buildApp();
  return app;
}

export async function resetDB() {
  // apaga tudo do banco de testes
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "User", "Unit", "Sale", "Expense", "Category" RESTART IDENTITY CASCADE`);
}

export async function close(app) {
  await app.close();
}
