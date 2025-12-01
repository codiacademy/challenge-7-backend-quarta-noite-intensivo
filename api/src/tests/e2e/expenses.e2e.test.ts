import { describe, beforeAll, afterAll, it, expect } from "vitest";
import request from "supertest";
import { buildApp } from "../../app";
import { setupTestDB, closeTestDB } from "../setup";
import { generateAccessToken } from "../../utils/generateToken";

let app: any;
let admin: any;
let unit: any;
let category: any;
let adminToken: string;

describe("Expenses E2E", () => {

  beforeAll(async () => {
    // prepara banco limpo e insere admin, unit e category
    const seed = await setupTestDB();
    admin = seed.admin;
    unit = seed.unit;
    category = seed.category;

    // sobe a aplicação
    app = await buildApp();

    // gera token do admin
    adminToken = generateAccessToken({
      userId: admin.id,
      role: admin.role,
    });
  });

  afterAll(async () => {
    await closeTestDB();
    await app.close();
  });

  it("should create an expense", async () => {
    const res = await request(app.server)
      .post("/api/v1/expenses")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        unitId: unit.id,
        categoryId: category.id,
        value: 200,
        date: new Date().toISOString(),
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
