import { FastifyInstance } from "fastify";
import { CategoryController } from "../controllers/categoryController";

const controller = new CategoryController();

export async function categoryRoutes(app: FastifyInstance) {
  app.post("/categories", controller.create.bind(controller));
  app.get("/categories", controller.list.bind(controller));
  app.get("/categories/:id", controller.get.bind(controller));
  app.put("/categories/:id", controller.update.bind(controller));
  app.delete("/categories/:id", controller.remove.bind(controller));
}
