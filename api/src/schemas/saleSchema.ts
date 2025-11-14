import { z } from "zod";

export const createSaleSchema = z.object({
  unitId: z.number().int(),
  categoryId: z.number().int().optional(),
  userId: z.number().int().optional(),
  clientName: z.string().optional(),
  quantity: z.number().int().min(1).default(1),
  unitPrice: z.number().positive(),
  date: z.string().optional(),
});

export const updateSaleSchema = createSaleSchema.partial();
export type CreateSaleInput = z.infer<typeof createSaleSchema>;
export type UpdateSaleInput = z.infer<typeof updateSaleSchema>;
