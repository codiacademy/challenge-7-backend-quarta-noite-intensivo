import { beforeAll, afterAll, describe, it, expect } from "vitest";
import request from "supertest";
import { build , resetDB } from "../tests-utils";
import { prisma } from "../../tests/prisma-test-env";
import { generateAccessToken } from "../../utils/generateToken";

describe("Categories E2E", () => {
  let app: any;
  let adminToken: string;

  beforeAll(async () => {
    // initTestEnv já limpa o banco, recria admin e sobe a app
    await resetDB();
    app = await build();

    const admin = await prisma.user.findFirst({
      where: { email: "admin@admin.com" }
    });

    adminToken = generateAccessToken({
      userId: admin!.id,
      role: admin!.role,
      email: admin!.email
    });
  });

  afterAll(async () => {
    await app.close();
    await prisma.$disconnect();
  });

  it("POST /api/v1/categories creates category", async () => {
    const res = await request(app.server)
      .post("/api/v1/categories")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ name: "Nova Categoria" });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Nova Categoria");
  });

  it("GET /api/v1/categories returns list", async () => {
    const res = await request(app.server)
      .get("/api/v1/categories")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
