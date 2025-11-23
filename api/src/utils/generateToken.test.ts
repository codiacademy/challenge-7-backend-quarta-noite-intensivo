import { it, expect, describe } from "vitest";
import jwt from "jsonwebtoken";
import { generateAccessToken } from "../utils/generateToken";
import { env } from "./env";

describe("generateToken util", () => {
  it("creates access token containing userId", () => {
    const token = generateAccessToken({ userId: 123, role: "ADMIN" } as any);
    const decoded: any = jwt.verify(token, env.JWT_SECRET);
    expect(decoded.userId).toBe(123);
    expect(decoded.role).toBe("ADMIN");
  });
});
