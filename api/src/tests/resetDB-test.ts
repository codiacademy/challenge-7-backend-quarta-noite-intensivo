import { PrismaClient } from "../../node_modules/.prisma/client-test";
const prisma = new PrismaClient();

export async function resetDatabase() {
  const rows = await prisma.$queryRaw<
    Array<{ tablename: string }>
  >`SELECT tablename FROM pg_tables WHERE schemaname='public';`;

  for (const row of rows) {
    await prisma.$executeRawUnsafe(
      `TRUNCATE TABLE "${row.tablename}" RESTART IDENTITY CASCADE`
    );
  }
}
