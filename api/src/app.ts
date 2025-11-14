import Fastify from "fastify";
import cors from "@fastify/cors";
import { errorHandler } from "./middlewares/errorHandler";
import { userRoutes } from "./routes/userRoutes";
import { unitRoutes } from "./routes/unitRoutes";
import { categoryRoutes } from "./routes/categoryRoutes";
import { saleRoutes } from "./routes/saleRoutes";
import { expenseRoutes } from "./routes/expenseRoutes";

export const app = Fastify({ logger: true });

app.register(cors, { origin: true });

app.setErrorHandler(errorHandler as any);

// register routes (no prefix here; you can add prefix '/api/v1' if you want)
app.register(userRoutes);
app.register(unitRoutes);
app.register(categoryRoutes);
app.register(saleRoutes);
app.register(expenseRoutes);
