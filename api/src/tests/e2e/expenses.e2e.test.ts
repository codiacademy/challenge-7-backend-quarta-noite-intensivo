import { beforeAll, afterAll, describe, it, expect } from "vitest";
import { setupTestDB } from "../setup";
import { build, close } from "../tests-utils";
import prisma from "../../utils/prisma";
import { generateAccessToken } from "../../utils/generateToken";

let app: any;
let adminToken: string;
let unitId: number;
let categoryId: number;

beforeAll(async () => {
  await setupTestDB();
  app = await build();

  const admin = await prisma.user.findUnique({ where: { email: "admin@test.local" } });
  adminToken = generateAccessToken({ userId: admin!.id, role: admin!.role });

  const unit = await prisma.unit.findFirst();
  unitId = unit!.id;
  const category = await prisma.category.findFirst();
  categoryId = category!.id;
});

afterAll(async () => {
  await prisma.$disconnect();
  await close();
});

describe("Expenses unit", () => {
  it("POST /expenses creates an expense", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/expenses",
      headers: { Authorization: `Bearer ${adminToken}` },
      payload: {
        unitId,
        categoryId,
        amount: 150,
        description: "Teste despesa",
        date: new Date().toISOString(),
      },
    });

    expect(res.statusCode).toBe(201);
    const body = res.json();
    expect(body).toHaveProperty("id");
  });

  it("GET /expenses returns list", async () => {
    const res = await app.inject({
      method: "GET",
      url: `/expenses?unitId=${unitId}`,
      headers: { Authorization: `Bearer ${adminToken}` },
    });

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.json())).toBeTruthy();
  });
});
