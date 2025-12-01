import { vi } from "vitest";

export const replyMock = {
  status: vi.fn().mockReturnThis(),
  code: vi.fn().mockReturnThis(),
  send: vi.fn(),
  header: vi.fn().mockReturnThis(),
};
