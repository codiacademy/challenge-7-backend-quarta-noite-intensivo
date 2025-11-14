import { FastifyInstance } from "fastify";
import { UserController } from "../controllers/userController";
const controller = new UserController();

export async function userRoutes(app: FastifyInstance) {
  app.post("/users", controller.create.bind(controller));
  app.get("/users", controller.list.bind(controller));
  app.get("/users/:id", controller.get.bind(controller));
  app.put("/users/:id", controller.update.bind(controller));
  app.delete("/users/:id", controller.remove.bind(controller));
}
