import { beforeAll, afterAll, describe, it, expect } from "vitest";
import { setupTestDB, closeTestDB } from "../setup";
import prisma from "../../utils/prisma";
import { generateAccessToken } from "../../utils/generateToken";
import { build, close} from "../tests-utils";
import request from "supertest";

describe("Units E2E", () => {

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
      role: admin!.role
    });

    app = await build();
  });

  afterAll(async () => {
    await closeTestDB();
    await app.close();
  });


  it("POST /api/v1/units creates unit", async () => {
    const res = await request(app.server)
      .post("/api/v1/units")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Unit Test 2",
        address: "Addr 2"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Unit Test 2");
  });


  it("GET /api/v1/units returns list", async () => {
    const res = await request(app.server)
      .get("/api/v1/units")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
