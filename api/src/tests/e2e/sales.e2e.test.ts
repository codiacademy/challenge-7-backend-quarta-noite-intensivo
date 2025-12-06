// src/tests/e2e/sales.e2e.test.ts
import request from "supertest";
import { beforeAll, afterAll, describe, it, expect } from "vitest";
import { setupTestDB, disconnectDB, prisma, build, close } from "../setup";

describe("Sales E2E", () => {
  let app: any;
  let adminToken: string;
  let unitId: number;
  let categoryId: number;

  beforeAll(async () => {
    const setup = await setupTestDB();
    adminToken = setup.adminToken;
    app = await build();

    const unit = await prisma.unit.create({
      data: { name: "Unit Test", address: "Rua 1" }
    });

    const category = await prisma.category.create({
      data: { name: "Category Test" }
    });

    unitId = unit.id;
    categoryId = category.id;
  });

  afterAll(async () => {
    await close(app);
    await disconnectDB();
  });

  it("cria venda", async () => {
  const res = await request(app.server)
    .post("/api/v1/sales")
    .set("Authorization", `Bearer ${adminToken}`)
    .send({
      unitId,
      categoryId,
      clientName: "Cliente Teste",
      quantity: 2,
      unitPrice: 50,
      totalPrice: 100,
      date: new Date().toISOString()
    });

  expect(res.statusCode).toBe(201);
  expect(res.body.clientName).toBe("Cliente Teste");
});
});
