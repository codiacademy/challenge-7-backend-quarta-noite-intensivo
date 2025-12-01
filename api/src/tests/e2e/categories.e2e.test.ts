import { beforeAll, afterAll, describe, it, expect } from "vitest";
import { setupTestDB, closeTestDB } from "../setup";
import prisma from "../../utils/prisma";
import { generateAccessToken } from "../../utils/generateToken";
import { build } from "../tests-utils";
import request from "supertest";

describe("Categories unit", () => {
  let app: any;
  let adminToken: string;

  beforeAll(async () => {
    await setupTestDB();

   const admin = await prisma.user.upsert({
    where: { email: "admin@test.local" },
    update: {},
    create: {
    name: "Admin",
    email: "admin@test.local",
    password: "hashed", 
    role: "ADMIN"
  }
});
    adminToken = generateAccessToken({
      userId: admin!.id,
      role: admin!.role,
    });
  });

  afterAll(async () => {
    await closeTestDB();
  });

  it("POST /api/v1/categories creates category", async () => {
    app = await build();

    const res = await request(app.server)
      .post("/api/v1/categories")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ name: "Nova Categoria" });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Nova Categoria");
  });

  it("GET /api/v1/categories returns list", async () => {
    app = await build();

    const res = await request(app.server)
    .get("/api/v1/categories")
    .set("Authorization", `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
