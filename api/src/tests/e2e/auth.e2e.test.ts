import request from "supertest";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { setupTestDB, closeTestDB} from "../setup";
import { build } from "../tests-utils";
import prisma from "../../utils/prisma";
import { generateAccessToken } from "../../utils/generateToken";

describe("Auth E2E", () => {
  let adminToken: string;
  let app:any

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
  });

afterAll(async () => {
    await closeTestDB();
  });  


  it("should create a user and login", async () => {
   app = await build();
    await app.ready();
    const res = await request(app.server)
      .post("/api/v1/auth")
      .send({
        name: "Bernardo",
        email: "a@a.com",
        password: "123456",
        role: "ADMIN"
      })
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.accessToken).toBeDefined();
    
  });
});
