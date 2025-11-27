import { describe, it, expect } from "vitest";
import { generateAccessToken } from "../../utils/generateToken";

describe("generateToken", () => {
  it("should create a valid jwt token", () => {
    const token = generateAccessToken({ id: 1 });

    expect(token).toBeDefined();
    expect(typeof token).toBe("string");
  });
});
