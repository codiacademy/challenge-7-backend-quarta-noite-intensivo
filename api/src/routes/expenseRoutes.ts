import { FastifyInstance } from "fastify";
import { ExpenseController } from "../controllers/expenseController";
import { hasRole } from "../middlewares/roles";
const controller = new ExpenseController();
export async function expenseRoutes(app: FastifyInstance) {
  app.post("/", { schema:{ tags:["Expenses"], summary:"Create expense", security:[{BearerAuth:[]}] }, preHandler:[hasRole("ADMIN","MANAGER")] }, controller.create.bind(controller));
  app.get("/", { schema:{ tags:["Expenses"], summary:"List expenses" } }, controller.list.bind(controller));
  app.get("/:id", controller.get.bind(controller));
  app.put("/:id", { preHandler:[hasRole("ADMIN","MANAGER")] }, controller.update.bind(controller));
  app.delete("/:id", { preHandler:[hasRole("ADMIN")] }, controller.remove.bind(controller));
}
