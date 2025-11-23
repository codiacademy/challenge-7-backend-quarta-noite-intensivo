import { beforeAll, afterAll, describe, it, expect } from "vitest";
import { setupTestDB } from "./setup";
import { build, close } from "./tests-utils";
import prisma from "../utils/prisma";
import { generateAccessToken } from "../utils/generateToken";

let app: any;
let adminToken: string;

beforeAll(async () => {
  await setupTestDB();
  app = await build();

  const admin = await prisma.user.findUnique({ where: { email: "admin@test.local" } });
  adminToken = generateAccessToken({ userId: admin!.id, role: admin!.role });
});

afterAll(async () => {
  await prisma.$disconnect();
  await close();
});

describe("Categories E2E", () => {
  it("POST /categories creates category", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/categories",
      headers: { Authorization: `Bearer ${adminToken}` },
      payload: { name: "Nova Categoria" },
    });

    expect(res.statusCode).toBe(201);
    const body = res.json();
    expect(body.name).toBe("Nova Categoria");
  });

  it("GET /categories returns list", async () => {
    const res = await app.inject({
      method: "GET",
      url: "/categories",
    });

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.json())).toBeTruthy();
  });
});
