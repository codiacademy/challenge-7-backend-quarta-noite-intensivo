import { SaleRepository } from "../repositories/saleRepository";
import { CreateSaleInput, UpdateSaleInput } from "../schemas/saleSchema";

const repo = new SaleRepository();

export class SaleService {
  async create(data: CreateSaleInput) {
    const date = data.date ? new Date(data.date) : new Date();
    const totalPrice = (data.quantity ?? 1) * data.unitPrice;
    return repo.create({ ...data, totalPrice, date });
  }

  async list(filter?: { unitId?: number; from?: Date; to?: Date }) {
    return repo.findAll(filter);
  }

  async get(id: number) {
    const s = await repo.findById(id);
    if (!s) throw new Error("Sale not found");
    return s;
  }

  async update(id: number, data: UpdateSaleInput) {
    await this.get(id);
    const updateData: any = { ...data };
    if (data.unitPrice || data.quantity) {
      const unitPrice = data.unitPrice ?? (await repo.findById(id))!.unitPrice;
      const quantity = data.quantity ?? (await repo.findById(id))!.quantity;
      updateData.totalPrice = unitPrice * quantity;
    }
    if (data.date) updateData.date = new Date(data.date as unknown as string);
    return repo.update(id, updateData);
  }

  async delete(id: number) {
    await this.get(id);
    return repo.delete(id);
  }
}
