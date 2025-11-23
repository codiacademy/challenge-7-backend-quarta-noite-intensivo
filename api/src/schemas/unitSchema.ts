import { z } from "zod";

export const createUnitSchema = z.object({ name: z.string().min(1), address: z.string().optional() });
export const updateUnitSchema = createUnitSchema.partial();
export type CreateUnitInput = z.infer<typeof createUnitSchema>;
export type UpdateUnitInput = z.infer<typeof updateUnitSchema>;
