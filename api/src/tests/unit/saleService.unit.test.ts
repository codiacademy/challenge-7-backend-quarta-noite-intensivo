// tests/saleService.unit.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../utils/prisma", () => {
  return {
    default: {
      sale: {
        create: vi.fn(),
        findMany: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
      },
      user: {
        findUnique: vi.fn(),
        create: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
        findMany: vi.fn(),
      },
    },
  };
});

import prisma from "../../utils/prisma";


describe("Sale service (unit)", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("create sale calls prisma.sale.create", async () => {
    // if you have a service, adapt this test to call it. Otherwise show default expectations
    (prisma.sale.create as any).mockResolvedValue({ id: 1, totalPrice: 1000 });
    // call your service or controller logic here. Example placeholder:
    const created = await prisma.sale.create({ data: { unitId: 1, unitPrice: 1000, totalPrice: 1000, date: new Date() } });
    expect(prisma.sale.create).toHaveBeenCalled();
    expect(created).toHaveProperty("id");
  });

  it("list sales calls prisma.sale.findMany", async () => {
    (prisma.sale.findMany as any).mockResolvedValue([{ id: 1 }]);
    const list = await prisma.sale.findMany();
    expect(list).toHaveLength(1);
  });
});
