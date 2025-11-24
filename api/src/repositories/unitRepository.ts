import prisma from "../utils/prisma";
import { CreateUnitInput, UpdateUnitInput } from "../schemas/unitSchema";
export class UnitRepository {
  create(data: CreateUnitInput) {
     return prisma.unit.create({ data }); }
  findAll() { 
    return prisma.unit.findMany(); }
  findById(id: number) {
     return prisma.unit.findUnique({ where: { id } }); }
  update(id: number, data: UpdateUnitInput) { 
    return prisma.unit.update({ where: { id }, data }); }
  delete(id: number) { 
    return prisma.unit.delete({ where: { id } }); }
}
