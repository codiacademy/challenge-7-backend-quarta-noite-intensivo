import { SaleRepository } from "../repositories/saleRepository";
const repo = new SaleRepository();
export class SaleService {
  async create(data:any){ const date = data.date ? new Date(data.date) : new Date(); const totalPrice = (data.quantity ?? 1) * data.unitPrice; return repo.create({ ...data, totalPrice, date }); }
  async list(filter?:any){ return repo.findAll(filter); }
  async get(id:number){ const s = await repo.findById(id); if(!s) throw Object.assign(new Error("Sale not found"), { statusCode: 404 }); return s; }
  async update(id:number, data:any){ await this.get(id); const existing = await repo.findById(id); const unitPrice = data.unitPrice ?? existing!.unitPrice; const quantity = data.quantity ?? existing!.quantity; const totalPrice = unitPrice * quantity; const updateData:any = { ...data, totalPrice }; if(data.date) updateData.date = new Date(data.date); return repo.update(id, updateData); }
  async delete(id:number){ await this.get(id); return repo.delete(id); }
}
