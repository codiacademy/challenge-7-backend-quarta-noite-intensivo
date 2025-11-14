import { UnitRepository } from "../repositories/unitRepository";
import { CreateUnitInput, UpdateUnitInput } from "../schemas/unitSchema";

const repo = new UnitRepository();

export class UnitService {
  async create(data: CreateUnitInput) {
    return repo.create(data);
  }

  async list() {
    return repo.findAll();
  }

  async get(id: number) {
    const unit = await repo.findById(id);
    if (!unit) throw new Error("Unit not found");
    return unit;
  }

  async update(id: number, data: UpdateUnitInput) {
    await this.get(id);
    return repo.update(id, data);
  }

  async delete(id: number) {
    await this.get(id);
    return repo.delete(id);
  }
}
