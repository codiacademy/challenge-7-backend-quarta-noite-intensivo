import { describe, it, expect, vi } from "vitest";
import { authService } from "../../src/auth/authService";
import { prismaMock } from "../mocks/prismaMock";

vi.mock("../../src/utils/prisma", () => ({
  default: prismaMock,
}));

describe("AuthService - Unit", () => {
  it("should fail login if user not found", async () => {
    prismaMock.user.findUnique.mockResolvedValue(null);

    const result = await authService.login("email@test.com", "123");

    expect(result).toBeNull();
  });
});
