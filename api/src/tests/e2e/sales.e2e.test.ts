import { beforeAll, afterAll, describe, it, expect } from "vitest";
import { prisma } from "../../tests/prisma-test-env";
import { generateAccessToken } from "../../utils/generateToken";
import { build , resetDB } from "../tests-utils";
import request from "supertest";


describe("Sales unit", () => {
  let app: any;
  let adminToken: string;
  let unitId: number;

  beforeAll(async () => {
    await resetDB();
    app = await build();
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

    adminToken = generateAccessToken({
      userId: admin.id,
      role: admin.role,
      email: admin.email
    });

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
    await app.close();
    await prisma.$disconnect();
  });

  it("POST /api/v1/sales creates a sale", async () => {
    const res = await request(app.server)
      .post("/api/v1/sales")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        unitId,
        clientName: "Cliente Test",
        quantity: 1,
        unitPrice: 1000,
        date: new Date().toISOString(),
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.totalPrice).toBe(1000);
  });

  it("GET /api/v1/sales returns list", async () => {
  
    const res = await request(app.server)
      .get(`/api/v1/sales?unitId=${unitId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
