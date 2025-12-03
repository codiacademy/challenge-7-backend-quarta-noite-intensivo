import request from "supertest";
import { beforeAll, expect, afterAll, it } from "vitest";
import {prisma} from "../../tests/prisma-test-env";
import { generateAccessToken } from "../../utils/generateToken";
import { build , resetDB } from "../tests-utils";


describe("Users E2E", () => {
  let app: any;
  let adminToken: string;

  beforeAll(async () => {
    await resetDB();
    app = await build();

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
      email: admin!.email
    });

      
  });

  afterAll(async () => {
    await app.close();
    await prisma.$disconnect();
  });

  it("should list users", async () => {
    const res = await request(app.server)
      .get("/api/v1/users")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
  });
});
