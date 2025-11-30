import request from "supertest";
import { buildApp } from "../../app";
import { beforeAll, expect, afterAll, it} from "vitest";
import { setupTestDB, closeTestDB } from "../setup";
import prisma from "../../utils/prisma";
import { generateAccessToken } from "../../utils/generateToken";

let app:any;
let adminToken: string;
  
beforeAll(async () => {
    await setupTestDB();
    const admin = await prisma.user.findUnique({ where:
       { email: "admin@test.local" }});
    adminToken = generateAccessToken({ 
      userId: admin!.id, role: admin!.role});
    });

  afterAll(async () => {
    await closeTestDB ();
  });

describe("Users E2E", () => {
  it("should list users", async () => {
    app = buildApp();
    const res = await request(app.server).get("/api/v1/users");
    expect(res.statusCode).toBe(200);
  });
});
