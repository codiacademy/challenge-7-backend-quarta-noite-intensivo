import Fastify from "fastify";
import SwaggerPlugin from "./plugins/swagger";
import authRoutes from "./auth/authRoutes";
import userRoutes from "./routes/userRoutes";
import { saleRoutes } from "./routes/saleRoutes";
import { unitRoutes } from "./routes/unitRoutes";
import { expenseRoutes } from "./routes/expenseRoutes";
import { categoryRoutes } from "./routes/categoryRoutes";
import { authGlobal } from "./middlewares/authGlobal";
import cors from "@fastify/cors";
import "dotenv/config";

const app = Fastify({ logger: false });

app.register(cors, { origin: true });
app.register(SwaggerPlugin);

const prefix = "/api/v1";

// hook global corrigido
app.addHook("preHandler", async (req, reply) => {
  if (req.url.startsWith(`${prefix}/auth`)) return;
  return authGlobal(req, reply);
});

app.register(unitRoutes, { prefix: `${prefix}/units` });
app.register(saleRoutes, { prefix: `${prefix}/sales` });
app.register(expenseRoutes, { prefix: `${prefix}/expenses` });
app.register(categoryRoutes, { prefix: `${prefix}/categories` });
app.register(userRoutes, { prefix: `${prefix}/users` });
app.register(authRoutes, { prefix: `${prefix}/auth` });

export default app;
