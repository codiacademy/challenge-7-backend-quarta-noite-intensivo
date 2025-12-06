// src/tests/e2e/users.e2e.test.ts
import request from "supertest";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { setupTestDB, disconnectDB, build, close  } from "../setup";


describe("Users E2E", () => {
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

  it("lista usuários", async () => {
    const res = await request(app.server)
      .get("/api/v1/users")
      .set("Authorization", `Bearer ${adminToken}`);

 console.log("STATUS:", res.statusCode);
 console.log("BODY:", res.body);
 console.log("TEXT:", res.text);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("cria usuário", async () => {
    const res = await request(app.server)
      .post("/api/v1/users")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Admin",
        email: "admin@admin.com",
        password: "123456",
        role: "admin"
      });

  console.log("STATUS:", res.statusCode);
  console.log("BODY:", res.body);
  console.log("TEXT:", res.text);


    expect(res.statusCode).toBe(201);
    expect(res.body.email).toBe("test@user.com");
    expect(res.body.id).toBeDefined();
  });
});
