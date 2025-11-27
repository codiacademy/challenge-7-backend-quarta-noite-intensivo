import { CategoryRepository } from "../repositories/categoryRepository";
import { CreateCategoryInput, UpdateCategoryInput } from "../schemas/categorySchema";

const repo = new CategoryRepository();

export class CategoryService {
  async create(data: CreateCategoryInput) {
    return repo.create(data);
  }

  async list() {
    return repo.findAll();
  }

  async get(id: number) {
    const c = await repo.findById(id);
    if (!c) throw new Error("Categoria não encontrada");
    return c;
  }

  async update(id: number, data: UpdateCategoryInput) {
    await this.get(id);
    return repo.update(id, data);
  }

  async delete(id: number) {
    await this.get(id);
    return repo.delete(id);
  }
}
