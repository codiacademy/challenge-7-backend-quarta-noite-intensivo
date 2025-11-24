import Fastify from "fastify";
import SwaggerPlugin from "./plugins/swagger";
import  authRoutes  from "./auth/authRoutes";
import userRoutes from "./routes/userRoutes";
import { saleRoutes } from "./routes/saleRoutes";
import { unitRoutes } from "./routes/unitRoutes";
import { expenseRoutes } from "./routes/expenseRoutes";
import { categoryRoutes } from "./routes/categoryRoutes";
import { authGlobal } from "./middlewares/authGlobal";

const app = Fastify({ logger: true });

app.register(SwaggerPlugin);

app.register(authRoutes, { prefix: "/auth" });

app.addHook("preHandler", authGlobal);

app.register(userRoutes, { prefix: "/users" });
app.register(saleRoutes, { prefix: "/sales" });
app.register(unitRoutes, { prefix: "/units" });
app.register(expenseRoutes, { prefix: "/expenses" });
app.register(categoryRoutes, { prefix: "/categories" });

export default app;
