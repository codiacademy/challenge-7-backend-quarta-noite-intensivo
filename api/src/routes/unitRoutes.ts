import { FastifyInstance } from "fastify";
import { UnitController } from "../controllers/unitController";

const controller = new UnitController();

export async function unitRoutes(app: FastifyInstance) {
  app.post("/units", controller.create.bind(controller));
  app.get("/units", controller.list.bind(controller));
  app.get("/units/:id", controller.get.bind(controller));
  app.put("/units/:id", controller.update.bind(controller));
  app.delete("/units/:id", controller.remove.bind(controller));
}
