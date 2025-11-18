import { FastifyInstance } from "fastify";
import { CategoryController } from "../controllers/categoryController";
import { hasRole } from "../middlewares/roles";
const controller = new CategoryController();
export async function categoryRoutes(app: FastifyInstance) {
  app.post("/", { schema:{ tags:["Categories"], summary:"Create category", security:[{BearerAuth:[]}] }, preHandler:[hasRole("ADMIN")] }, controller.create.bind(controller));
  app.get("/", controller.list.bind(controller));
  app.get("/:id", controller.get.bind(controller));
  app.put("/:id", { preHandler:[hasRole("ADMIN")] }, controller.update.bind(controller));
  app.delete("/:id", { preHandler:[hasRole("ADMIN")] }, controller.remove.bind(controller));
}
