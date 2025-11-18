import { FastifyInstance } from "fastify";
import { userController } from "../controllers/userController";
import { $ref } from "../schemas/userSchema";

export default async function userRoutes(app: FastifyInstance) {
  app.post(
    "/",
    {
      schema: {
        tags: ["Users"],
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
        params: $ref("userIdParamSchema"),
      },
    },
    userController.remove
  );
}
