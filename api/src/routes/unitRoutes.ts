import { FastifyInstance } from "fastify";
import { UnitController } from "../controllers/unitController";
import { hasRole } from "../middlewares/roles";
const controller = new UnitController();
export async function unitRoutes(app: FastifyInstance) {
  app.post("/", { schema:{ tags:["Units"], summary:"Create unit", security:[{BearerAuth:[]}] }, preHandler:[hasRole("ADMIN")] }, controller.create.bind(controller));
  app.get("/", { schema:{ tags:["Units"], summary:"List units" } }, controller.list.bind(controller));
  app.get("/:id", controller.get.bind(controller));
  app.put("/:id", { schema:{ tags:["Units"], summary:"Update unit", security:[{BearerAuth:[]}] }, preHandler:[hasRole("ADMIN")] }, controller.update.bind(controller));
  app.delete("/:id", { schema:{ tags:["Units"], summary:"Delete unit", security:[{BearerAuth:[]}] }, preHandler:[hasRole("ADMIN")] }, controller.remove.bind(controller));
}
