import { FastifyInstance } from "fastify";
import { SaleController } from "../controllers/saleController";

const controller = new SaleController();

export async function saleRoutes(app: FastifyInstance) {
  app.post("/sales", controller.create.bind(controller));
  app.get("/sales", controller.list.bind(controller));
  app.get("/sales/:id", controller.get.bind(controller));
  app.put("/sales/:id", controller.update.bind(controller));
  app.delete("/sales/:id", controller.remove.bind(controller));
}
