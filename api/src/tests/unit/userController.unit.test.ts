import { describe, it, expect, vi, beforeEach } from "vitest";
import { userController } from "../../src/controllers/userController";
import { prismaMock } from "../mocks/prismaMock";

vi.mock("../../src/utils/prisma", () => ({
  default: prismaMock,
}));

describe("UserController - Unit", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should create a user", async () => {
    const req: any = {
      body: {
        name: "Bernardo",
        email: "test@test.com",
        password: "123456",
        role: "USER"
      },
    };

    const reply: any = {
      code: vi.fn().mockReturnThis(),
      send: vi.fn(),
    };

    prismaMock.user.create.mockResolvedValue({
      id: 1,
      name: "Bernardo",
      email: "test@test.com",
      role: "USER",
    });

    await userController.create(req, reply);

    expect(reply.send).toHaveBeenCalled();
    expect(prismaMock.user.create).toHaveBeenCalled();
  });
});
