import { z } from "zod";
export const createExpenseSchema = z.object({
  unitId: z.number().int(),
  categoryId: z.number().int(),
  userId: z.number().int().optional(),
  description: z.string().optional(),
  amount: z.number().positive(),
  date: z.string().optional()
});
export const updateExpenseSchema = createExpenseSchema.partial();
export type CreateExpenseInput = z.infer<typeof createExpenseSchema>;
export type UpdateExpenseInput = z.infer<typeof updateExpenseSchema>;
