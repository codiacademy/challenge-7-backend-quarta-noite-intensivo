import Fastify from "fastify";
import SwaggerPlugin from "./plugins/swagger";
import authRoutes from "./auth/authRoutes";
import userRoutes from "./routes/userRoutes";
import { saleRoutes } from "./routes/saleRoutes";
import { unitRoutes } from "./routes/unitRoutes";
import { expenseRoutes } from "./routes/expenseRoutes";
import { categoryRoutes } from "./routes/categoryRoutes";
import { authGlobal } from "./middlewares/authGlobal";

const app = Fastify({ logger: true });

// swagger
app.register(SwaggerPlugin);

// rotas públicas
app.register(authRoutes, { prefix: "/auth" });

// middleware global
app.addHook("preHandler", authGlobal);

// rotas protegidas
app.register(userRoutes, { prefix: "/api/v1/users" });
app.register(saleRoutes, { prefix: "/api/v1/sales" });
app.register(unitRoutes, { prefix: "/api/v1/units" });
app.register(expenseRoutes, { prefix: "/api/v1/expenses" });
app.register(categoryRoutes, { prefix: "/api/v1/categories" });

export default app;
