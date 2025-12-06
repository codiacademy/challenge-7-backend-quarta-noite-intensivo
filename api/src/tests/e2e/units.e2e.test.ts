// src/tests/e2e/units.e2e.test.ts
import request from "supertest";
import { beforeAll, afterAll, describe, it, expect } from "vitest";
import { setupTestDB, disconnectDB, build, close } from "../setup";

describe("Units E2E", () => {
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

  it("cria unidade", async () => {
    const res = await request(app.server)
      .post("/api/v1/units")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Unidade X",
        address: "Rua 123"
      });

  console.log("STATUS:", res.statusCode);
  console.log("BODY:", res.body);
  console.log("TEXT:", res.text);


    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Unidade X");
  });
});
