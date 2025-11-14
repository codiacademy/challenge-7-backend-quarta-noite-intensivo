import { ExpenseRepository } from "../repositories/expenseRepository";
import { CreateExpenseInput, UpdateExpenseInput } from "../schemas/expenseSchema";

const repo = new ExpenseRepository();

export class ExpenseService {
  async create(data: CreateExpenseInput) {
    const date = data.date ? new Date(data.date) : new Date();
    return repo.create({ ...data, date });
  }

  async list(filter?: { unitId?: number; from?: Date; to?: Date }) {
    return repo.findAll(filter);
  }

  async get(id: number) {
    const e = await repo.findById(id);
    if (!e) throw new Error("Expense not found");
    return e;
  }

  async update(id: number, data: UpdateExpenseInput) {
    await this.get(id);
    const updateData: any = { ...data };
    if (data.date) updateData.date = new Date(data.date as unknown as string);
    return repo.update(id, updateData);
  }

  async delete(id: number) {
    await this.get(id);
    return repo.delete(id);
  }
}
