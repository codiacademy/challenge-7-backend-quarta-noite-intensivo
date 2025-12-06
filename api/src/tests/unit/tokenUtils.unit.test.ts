import { describe, it, expect } from "vitest";
import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "../../utils/generateToken";
import { env } from "../../utils/env";

describe("Token utils", () => {
  it("generateAccessToken includes id and role", () => {
    const payload = { id: 42, email: "a@b.com", role: "ADMIN" };
    const token = generateAccessToken(payload as any);
    const decoded = jwt.verify(token, env.JWT_SECRET as string) as any;
    expect(decoded.id).toBe(42);
    expect(decoded.role).toBe("ADMIN");
  });

  it("generateRefreshToken includes id", () => {
    const token = generateRefreshToken({ id: 100 } as any);
    const decoded = jwt.verify(token, env.JWT_REFRESH_SECRET as string) as any;
    expect(decoded.id).toBe(100);
  });
});
