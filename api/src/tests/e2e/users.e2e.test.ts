import request from "supertest";
import app from "../../app";

describe("Users E2E", () => {
  it("should list users", async () => {
    const res = await request(app.server).get("/users");
    expect(res.statusCode).toBe(200);
  });
});
