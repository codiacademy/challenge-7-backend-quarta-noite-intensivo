import { FastifyInstance } from "fastify";
import { userController } from "../controllers/userController";
import { $ref } from "../schemas/userSchema";

export default async function userRoutes(app: FastifyInstance) {
  app.post(
    "/",
    {
      schema: {
        tags: ["Users"],
        summary: "Cria um novo usuário",
        body: $ref("createUserSchema"),
        response: {
          201: $ref("userResponseSchema"),
        },
      },
    },
    userController.create
  );

  app.get(
    "/",
    {
      schema: {
        tags: ["Users"],
        summary: "Lista todos os usuários",
        response: {
          200: $ref("userListResponseSchema"),
        },
      },
    },
    userController.list
  );

  app.get(
    "/:id",
    {
      schema: {
        tags: ["Users"],
        summary: "Busca um usuário por ID",
        params: $ref("userIdParamSchema"),
        response: {
          200: $ref("userResponseSchema"),
        },
      },
    },
    userController.find
  );

  app.put(
    "/:id",
    {
      schema: {
        tags: ["Users"],
        summary: "Atualiza um usuário pelo ID",
        params: $ref("userIdParamSchema"),
        body: $ref("updateUserSchema"),
        response: {
          200: $ref("userResponseSchema"),
        },
      },
    },
    userController.update
  );

  app.delete(
    "/:id",
    {
      schema: {
        tags: ["Users"],
        summary: "Remove um usuário pelo ID",
        params: $ref("userIdParamSchema"),
        response: {
          204: {
            type: "null",
            description: "Usuário removido com sucesso",
          },
        },
      },
    },
    userController.remove
  );
}
