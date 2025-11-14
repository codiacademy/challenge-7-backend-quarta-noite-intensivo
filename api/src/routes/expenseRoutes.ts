import { FastifyInstance } from "fastify";
import { ExpenseController } from "../controllers/expenseController";

const controller = new ExpenseController();

export async function expenseRoutes(app: FastifyInstance) {
  app.post("/expenses", controller.create.bind(controller));
  app.get("/expenses", controller.list.bind(controller));
  app.get("/expenses/:id", controller.get.bind(controller));
  app.put("/expenses/:id", controller.update.bind(controller));
  app.delete("/expenses/:id", controller.remove.bind(controller));
}
