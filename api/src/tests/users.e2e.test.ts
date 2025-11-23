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

  // cria admin token
  const admin = await prisma.user.findUnique({ where: { email: "admin@test.local" } });
  adminToken = generateAccessToken({ userId: admin!.id, role: admin!.role });
});

afterAll(async () => {
  await prisma.$disconnect();
  await close();
});

describe("Users E2E", () => {
  it("GET /users should be protected and require token", async () => {
    const res = await app.inject({ method: "GET", url: "/users" });
    expect(res.statusCode).toBe(401);
  });

  it("GET /users with admin token returns list", async () => {
    const res = await app.inject({
      method: "GET",
      url: "/users",
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    expect(res.statusCode).toBe(200);
    const body = res.json();
    expect(Array.isArray(body)).toBeTruthy();
  });

  it("POST /users creates user", async () => {
    const email = `user_${Date.now()}@test.local`;
    const res = await app.inject({
      method: "POST",
      url: "/users",
      headers: { Authorization: `Bearer ${adminToken}` },
      payload: { name: "User Test", email, password: "123456", role: "USER" },
    });

    expect(res.statusCode).toBe(201);
    const body = res.json();
    expect(body).toHaveProperty("id");
    expect(body.email).toBe(email);
  });
});
