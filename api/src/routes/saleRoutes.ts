import { FastifyInstance } from "fastify";
import { SaleController } from "../controllers/saleController";
import { hasRole } from "../middlewares/hasRole";

const controller = new SaleController();

export async function saleRoutes(app: FastifyInstance) {
  app.post("/", { schema:{ tags:["Sales"], summary:"Create sale", security:[{BearerAuth:[]}] }, preHandler:[hasRole("ADMIN","MANAGER")] }, controller.create.bind(controller));

  app.get("/", { schema:{ tags:["Sales"], summary:"List sales" } }, controller.list.bind(controller));

  app.get("/:id", controller.get.bind(controller));

  app.put("/:id", { preHandler:[hasRole("ADMIN","MANAGER")] }, controller.update.bind(controller));
  
  app.delete("/:id", { preHandler:[hasRole("ADMIN")] }, controller.remove.bind(controller));
}
