import { FastifyInstance } from "fastify";
import { userController } from "../controllers/userController";
import { hasRole } from "../middlewares/hasRole";
import { isSelfOrAdmin } from "../middlewares/isSelfOrAdmin";

export default async function userRoutes(app: FastifyInstance) {
  app.post("/", { schema: { tags: ["Users"] } }, userController.create); // allow public or restrict by role
  app.get("/", { preHandler: [hasRole("ADMIN")], schema: { tags: ["Users"] } }, userController.list);
  app.get("/:id", { preHandler: [isSelfOrAdmin()], schema: { tags: ["Users"] } }, userController.find);
  app.put("/:id", { preHandler: [isSelfOrAdmin()], schema: { tags: ["Users"] } }, userController.update);
  app.delete("/:id", { preHandler: [hasRole("ADMIN")], schema: { tags: ["Users"] } }, userController.remove);
}
