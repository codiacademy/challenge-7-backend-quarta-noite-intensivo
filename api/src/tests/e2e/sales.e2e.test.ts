import { beforeAll, afterAll, describe, it, expect } from "vitest";
import { setupTestDB } from "../setup";
import { build, close } from "../tests-utils";
import prisma from "../../utils/prisma";
import { generateAccessToken } from "../../utils/generateToken";

let app: any;
let adminToken: string;
let unitId: number;

beforeAll(async () => {
  await setupTestDB();
  app = await build();

  // garante admin
  const admin = await prisma.user.upsert({
    where: { email: "admin@test.local" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@test.local",
      password: "hashed",
      role: "ADMIN",
    },
  });

  adminToken = generateAccessToken({ userId: admin.id, role: admin.role });

  // garante unit
  const unit = await prisma.unit.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: "Unidade Teste",
    },
  });

  unitId = unit.id;
});

afterAll(async () => {
  await prisma.$disconnect();
  await close();
});

describe("Sales unit", () => {
  it("POST /sales creates a sale", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/sales",
      headers: { Authorization: `Bearer ${adminToken}` },
      payload: {
        unitId,
        clientName: "Cliente Test",
        quantity: 1,
        unitPrice: 1000,
        date: new Date().toISOString(),
      },
    });

    expect(res.statusCode).toBe(201);

    const body = res.json();
    expect(body).toHaveProperty("id");
    expect(body.totalPrice).toBe(1000);
  });

  it("GET /sales returns list (filter by unit)", async () => {
    const res = await app.inject({
      method: "GET",
      url: `/sales?unitId=${unitId}`,
      headers: { Authorization: `Bearer ${adminToken}` },
    });

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.json())).toBe(true);
  });
});
