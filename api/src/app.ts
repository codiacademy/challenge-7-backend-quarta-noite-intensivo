import Fastify from "fastify";
import cors from "@fastify/cors";
import swagger from "./plugins/swagger"; // se você tem plugin
import { unitRoutes } from "./routes/unitRoutes";
import { categoryRoutes } from "./routes/categoryRoutes";
import { saleRoutes } from "./routes/saleRoutes";
import { expenseRoutes } from "./routes/expenseRoutes";
import { userRoutes } from "./routes/userRoutes";

export const app = Fastify({ logger: true });

app.register(cors, { origin: (origin, cb) => cb(null, true) });

// register existing routes
app.register(userRoutes); // se usava sem prefix
// novas rotas
app.register(unitRoutes);
app.register(categoryRoutes);
app.register(saleRoutes);
app.register(expenseRoutes);

// se quiser prefixar com /api/v1, faça app.register(fn, { prefix: '/api/v1' })
