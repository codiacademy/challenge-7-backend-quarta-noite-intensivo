import request from "supertest";
import { beforeAll, afterAll, describe, it, expect } from "vitest";
import { setupTestDB, disconnectDB} from "../setup";
import app from "../../app"
describe("Categories E2E", () => {
  let adminToken: string;
  beforeAll(async () => {
    const setup = await setupTestDB();
    adminToken = setup.adminToken;
    await app.ready();
  });
  afterAll(async () => {
    await app.close;
    await disconnectDB();
  });
  it("cria categoria", async () => {
    const res = await request(app.server)
      .post("/api/v1/categories")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Categoria X"
      });

  console.log("STATUS:", res.statusCode);
  console.log("BODY:", res.body);
  console.log("TEXT:", res.text);

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Categoria X");
  });
});
