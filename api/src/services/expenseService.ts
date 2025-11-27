import { ExpenseRepository } from "../repositories/expenseRepository";
const repo = new ExpenseRepository();
export class ExpenseService {
  
  async create(data:any){
   const date = data.date ? new Date(data.date) : new Date();
    return repo.create({ ...data, date }); }

  async list(filter?:any){ 
    return repo.findAll(filter); }

  async get(id:number){ 
    const e = await repo.findById(id); 
    if(!e) 
      throw Object.assign(new Error("Expense not found"), { statusCode:404 });
     return e; }

  async update(id:number,data:any){ 
    await this.get(id);
     const updateData:any = { ...data }; 
     if(data.date) updateData.date = new Date(data.date); 
     return repo.update(id, updateData); }
     
  async delete(id:number){
     await this.get(id);
      return repo.delete(id); }
}
