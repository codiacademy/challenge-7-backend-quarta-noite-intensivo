import request from "supertest";
import { beforeAll, afterAll, describe, it, expect } from "vitest";
import { setupTestDB, disconnectDB, build, close } from "../setup";

describe("Auth E2E", () => {
  let app: any;
  let adminToken: string;

  beforeAll(async () => {
    const setup = await setupTestDB();
    adminToken = setup.adminToken;
    app = await build();
  });

  afterAll(async () => {
    await close(app);
    await disconnectDB();
  });

  it("should login with admin credentials", async () => {
    const res = await request(app.server)
      .post("/api/v1/auth")
      .send({
        email: "admin@admin.com",
        password: "123456"
      });

  console.log("STATUS:", res.statusCode);
  console.log("BODY:", res.body); 
  console.log("TEXT:", res.text);


    expect(res.statusCode).toBe(200);
    expect(res.body.accessToken).toBeDefined();
  });

  it("should allow admin to create a new user", async () => {
    const res = await request(app.server)
      .post("/api/v1/auth")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "New User",
        email: "newuser@test.com",
        password: "123456",
        role: "USER"
      });

    expect(res.statusCode).toBe(200); 
    expect(res.body.accessToken || res.body.user).toBeDefined();
  });
});
