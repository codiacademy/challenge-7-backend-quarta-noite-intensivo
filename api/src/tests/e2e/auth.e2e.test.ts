import request from "supertest";
import app from "../../src/app";

describe("Auth E2E", () => {
  it("should create a user and login", async () => {
    await request(app.server)
      .post("/users")
      .send({
        name: "Bernardo",
        email: "a@a.com",
        password: "123456",
        role: "ADMIN"
      });

    const res = await request(app.server)
      .post("/auth/login")
      .send({ email: "a@a.com", password: "123456" });

    expect(res.statusCode).toBe(200);
    expect(res.body.accessToken).toBeDefined();
  });
});
