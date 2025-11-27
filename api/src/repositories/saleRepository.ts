import prisma from "../utils/prisma";
import type { CreateSaleInput, UpdateSaleInput } from "../schemas/saleSchema";
import { createSaleSchema } from "../schemas/saleSchema";

export class SaleRepository {

  create(data: CreateSaleInput & { totalPrice:number; date:Date }) {
    
    const validated = createSaleSchema.parse(data);
    
    return prisma.sale.create({
    data: {
      clientName: validated.clientName,
      user: { connect: { id: validated.userId } },        
      unit: { connect: { id: validated.unitId } },        
      category: { connect: { id: validated.categoryId } },
      date: validated.date,
      unitPrice: validated.unitPrice,
      quantity: validated.quantity,
      totalPrice: data.totalPrice,
    },
  });
  }
  findAll(filter?: any) {
    const where:any = {};
    if(filter?.unitId) where.unitId = filter.unitId;
    if(filter?.from || filter?.to){ where.date = {}; 
    if(filter.from) where.date.gte = filter.from;
    if(filter.to) where.date.lte = filter.to; }
      return prisma.sale.findMany({ where, orderBy:{ date: "desc" } });
  }

  findById(id:number){ 
    return prisma.sale.findUnique({ where: { id } });
   }

  update(id:number, data: Partial<UpdateSaleInput & { totalPrice?:number; date?:Date }>) {
     return prisma.sale.update({ where:{ id }, data }); 
    }
    
  delete(id:number) {
     return prisma.sale.delete({ where:{ id } }); 
    }
}
