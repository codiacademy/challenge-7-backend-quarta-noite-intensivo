import request from "supertest";
import { beforeAll, afterAll, describe, it, expect } from "vitest";
import { setupTestDB, disconnectDB, prisma, build, close } from "../setup";

describe("Expenses E2E", () => {
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

  it("creates an expense", async () => {
  const res = await request(app.server)
    .post("/api/v1/expenses")
    .set("Authorization", `Bearer ${adminToken}`)
    .send({
      unitId,
      categoryId,
      description: "Despesa teste",
      amount: 75,
      date: new Date().toISOString()
    });




console.log("STATUS:", res.statusCode);
console.log("BODY:", res.body);
console.log("TEXT:", res.text);

  expect(res.statusCode).toBe(201);
  expect(res.body).toHaveProperty("id");
  expect(res.body.amount).toBe(75);
});


  it("lists expenses", async () => {
  const res = await request(app.server)
    .get("/api/v1/expenses")
    .set("Authorization", `Bearer ${adminToken}`)
  expect(res.statusCode).toBe(200);

  expect(Array.isArray(res.body)).toBe(true);
});
});
