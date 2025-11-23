import { beforeAll, afterAll, describe, it, expect } from "vitest";
import { setupTestDB } from "./setup";
import { build, close } from "./tests-utils";
import prisma from "../utils/prisma";

let app: any;

beforeAll(async () => {
  await setupTestDB();
  app = await build();
});

afterAll(async () => {
  await prisma.$disconnect();
  await close();
});

describe("Auth E2E", () => {
  it("login with valid credentials returns tokens", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/auth/login",
      payload: { email: "admin@test.local", password: "123456" },
    });

    expect(res.statusCode).toBe(200);
    const body = res.json();
    expect(body).toHaveProperty("accessToken");
    expect(body).toHaveProperty("refreshToken");
    expect(body).toHaveProperty("user");
    expect(body.user.email).toBe("admin@test.local");
  });

  it("refresh returns new access token", async () => {
    // login first
    const login = await app.inject({
      method: "POST",
      url: "/auth/login",
      payload: { email: "admin@test.local", password: "123456" },
    });
    const { refreshToken } = login.json();

    const res = await app.inject({
      method: "POST",
      url: "/auth/refresh",
      payload: { refreshToken },
    });

    expect(res.statusCode).toBe(200);
    expect(res.json()).toHaveProperty("accessToken");
  });

  it("invalid login returns 401", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/auth/login",
      payload: { email: "notfound@test", password: "wrong" },
    });
    expect(res.statusCode).toBe(401);
  });
});
