import { beforeAll, afterAll, describe, it, expect } from "vitest";
import { setupTestDB } from "../tests/setup";
import { build, close } from "../tests/tests-utils";
import { generateAccessToken } from "../utils/generateToken";
import prisma from "../utils/prisma";

let app: any;
let adminToken: string;
let userToken: string;

beforeAll(async () => {
  await setupTestDB();
  app = await build();

  const admin = await prisma.user.findUnique({ where: { email: "admin@test.local" } });
  adminToken = generateAccessToken({ userId: admin!.id, role: admin!.role });

  // create normal user
  const user = await prisma.user.create({
    data: {
      name: "User Normal",
      email: `user_normal_${Date.now()}@test.local`,
      password: await import("bcryptjs").then(m => m.hash("123456", 10)),
      role: "USER",
    },
  });
  userToken = generateAccessToken({ userId: user.id, role: user.role });
});

afterAll(async () => {
  await prisma.$disconnect();
  await close();
});

describe("Middlewares E2E", () => {
  it("should block route without token", async () => {
    const res = await app.inject({ method: "GET", url: "/users" });
    expect(res.statusCode).toBe(401);
  });

  it("should allow ADMIN to access admin route", async () => {
    const res = await app.inject({
      method: "GET",
      url: "/users",
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    expect(res.statusCode).toBe(200);
  });

  it("should forbid USER from admin route", async () => {
    const res = await app.inject({
      method: "GET",
      url: "/users",
      headers: { Authorization: `Bearer ${userToken}` },
    });
    expect(res.statusCode).toBe(403);
  });
});
