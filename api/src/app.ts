import Fastify from "fastify";
import cors from "@fastify/cors";
import { errorHandler } from "./middlewares/errorHandler";
import  userRoutes  from "./routes/userRoutes";
import { unitRoutes } from "./routes/unitRoutes";
import { categoryRoutes } from "./routes/categoryRoutes";
import { saleRoutes } from "./routes/saleRoutes";
import { expenseRoutes } from "./routes/expenseRoutes";
import { authRoutes } from "./auth/authRoutes";

export const app = Fastify({ logger: true });

app.register(cors, { origin: true });

app.setErrorHandler(errorHandler as any);

// register routes 
app.register(userRoutes, { prefix: "/api/v1/auth" });
app.register(unitRoutes, { prefix: "/api/v1/auth" });
app.register(categoryRoutes, { prefix: "/api/v1/auth" });
app.register(saleRoutes, { prefix: "/api/v1/auth" });
app.register(expenseRoutes, { prefix: "/api/v1/auth" });
app.register(authRoutes, { prefix: "/api/v1/auth" });