import request from "supertest";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { setupTestDB, closeTestDB} from "../setup";

let app:any

beforeAll(async () => {
    await setupTestDB();
  });

afterAll(async () => {
    await closeTestDB();
  });  

describe("Auth E2E", () => {
  it("should create a user and login", async () => {
   
    await app.ready();
    
    const res = await request(app.server)
      .post("/api/v1/auth")
      .send({
        name: "Bernardo",
        email: "a@a.com",
        password: "123456",
        role: "ADMIN"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.accessToken).toBeDefined();
  });
});
