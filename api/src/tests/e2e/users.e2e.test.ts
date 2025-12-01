import request from "supertest";
import { beforeAll, expect, afterAll, it } from "vitest";
import { setupTestDB, closeTestDB } from "../setup";
import prisma from "../../utils/prisma";
import { generateAccessToken } from "../../utils/generateToken";
import { build } from "../tests-utils";

describe("Users E2E", () => {
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
    password: "hashed", // qualquer string
    role: "ADMIN"
  }
});

    adminToken = generateAccessToken({
      userId: admin!.id,
      role: admin!.role,
    });

    app = await build();   // necessário
  });

  afterAll(async () => {
    await closeTestDB();
  });

  it("should list users", async () => {
    const res = await request(app.server)
      .get("/api/v1/users")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
  });
});
