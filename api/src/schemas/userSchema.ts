import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

export const createUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["admin", "manager", "accountant"]).default("manager")
});

export const updateUserSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  role: z.enum(["admin", "manager", "accountant"]).optional(),
  password: z.string().min(6),
});

export type CreateUserDTO = z.infer<typeof createUserSchema>;
export type UpdateUserDTO = z.infer<typeof updateUserSchema>;

export const userResponseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string(),
  role: z.string(),
  createdAt: z.string(),
});

export const userListResponseSchema = z.array(userResponseSchema);

export const userIdParamSchema = z.object({
  id: z.string().uuid(),
});

export const { schemas: userSchemas, $ref } = buildJsonSchemas(
  {
    createUserSchema,
    updateUserSchema,
    userResponseSchema,
    userListResponseSchema,
    userIdParamSchema,
  },
  { $id: "UserSchemas" }
);
