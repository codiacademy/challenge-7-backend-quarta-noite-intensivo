import { describe, it, expect, vi, beforeEach } from "vitest";
import { userController } from "../../controllers/userController";
import { prismaMock } from "../../mocks/prismaMock";
import { replyMock } from "../../mocks/replyMock";

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

    const reply: any = {...replyMock};

    prismaMock.user.create.mockResolvedValue({
      id: 1,
      name: "Bernardo",
      email: "test@test.com",
      role: "USER",
    });

    await userController.create(req, reply);

    expect(reply.send).toHaveBeenCalled();
    
  });
});
