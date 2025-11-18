import Fastify from "fastify";
import swaggerPlugin from "./plugins/swagger";

import userRoutes from "./routes/userRoutes";
import { saleRoutes } from "./routes/saleRoutes";
import { unitRoutes } from "./routes/unitRoutes";
import { expenseRoutes } from "./routes/expenseRoutes";
import { categoryRoutes } from "./routes/categoryRoutes";

import { authGlobal } from "./middlewares/authGlobal";

const app = Fastify({
  logger: true,
});

// Rotas públicas (não exigem token)
const PUBLIC_ROUTES = [
  "/docs",
  "/docs/json",
  "/auth/login",
  "/auth/refresh",
  "/users/create", // caso o cadastro seja público
];

// Swagger
app.register(swaggerPlugin);

// Middleware global com exceções
app.addHook("onRequest", async (req, reply) => {
  const isPublic = PUBLIC_ROUTES.some((r) => req.url.startsWith(r));
  if (!isPublic) {
    await authGlobal(req, reply);
  }
});

// Registro das rotas
app.register(userRoutes, { prefix: "/users" });
app.register(saleRoutes, { prefix: "/sales" });
app.register(unitRoutes, { prefix: "/units" });
app.register(expenseRoutes, { prefix: "/expenses" });
app.register(categoryRoutes, { prefix: "/categories" });

export default app;
