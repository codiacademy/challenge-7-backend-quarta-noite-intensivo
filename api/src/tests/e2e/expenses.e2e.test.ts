import { describe, beforeAll, afterAll, it, expect } from "vitest";
import request from "supertest";
import { build, resetDB } from "../tests-utils";
import { prisma } from "../../tests/prisma-test-env";
import { generateAccessToken } from "../../utils/generateToken";

let app: any;
let admin: any;
let unit: any;
let category: any;
let adminToken: string;

describe("Expenses E2E", () => {
  beforeAll(async () => {
    await resetDB();
    app = await build();

    admin = await prisma.user.findFirst({
      where: { email: "admin@admin.com" }
    });

    unit = await prisma.unit.create({
      data: { name: "Default Unit" }
    });

    category = await prisma.category.create({
      data: { name: "Default Category" }
    });

    adminToken = generateAccessToken({
      userId: admin.id,
      role: admin.role,
      email: admin.email
    });
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
    await prisma.$disconnect();
  });

  it("should create an expense", async () => {
    const res = await request(app.server)
      .post("/api/v1/expenses")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        unitId: unit.id,
        categoryId: category.id,
        value: 200,
        date: new Date().toISOString()
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
  });

  it("should list expenses", async () => {
    const res = await request(app.server)
      .get("/api/v1/expenses")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
