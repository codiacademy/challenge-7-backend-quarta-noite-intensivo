import Fastify from "fastify";
import swaggerPlugin from "./plugins/swagger";

import userRoutes from "./routes/userRoutes";
import {saleRoutes} from "./routes/saleRoutes";
import {unitRoutes} from "./routes/unitRoutes";
import {expenseRoutes} from "./routes/expenseRoutes";
import {categoryRoutes} from "./routes/categoryRoutes";

// Middlewares globais
import { authGlobal } from "./middlewares/authGlobal";

const app = Fastify({
  logger: true,
});

// REGISTRO DOS PLUGINS
app.register(swaggerPlugin);

// MIDDLEWARE GLOBAL (todas rotas privadas)
app.addHook("preHandler", authGlobal);

// ROTAS
app.register(userRoutes, { prefix: "/users" });
app.register(saleRoutes, { prefix: "/sales" });
app.register(unitRoutes, { prefix: "/units" });
app.register(expenseRoutes, { prefix: "/expenses" });
app.register(categoryRoutes, { prefix: "/categories" });

export default app;
