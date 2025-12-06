// src/tests/setup.ts
import { prisma } from "../utils/prisma";
import app from "../app";
import { generateAccessToken } from "../utils/generateToken";

export async function setupTestDB() {
  await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE "Sale", "Expense", "Category", "Unit", "User" RESTART IDENTITY CASCADE;
  `);
  const admin = await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@admin.com",
      password: "123456",
      role: "admin"
    }
  });

   const adminToken = generateAccessToken({
    id: admin.id,
    email: admin.email,
    role: admin.role
  });

  return {adminToken}
}

// app real
export async function build() {
  await app.ready();
  return app;
}

export async function close(instance: any) {
  try {
    if (instance) await instance.close();
  } catch {} 
}

export { prisma };

export async function disconnectDB() {
  await prisma.$disconnect();
}
