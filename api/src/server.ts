import Fastify from "fastify";
import swaggerPlugin from "./plugins/swagger";
import { authGlobal } from "./middlewares/authGlobal";

import userRoutes from "./routes/userRoutes";

const app = Fastify({ logger: true });

async function start() {
  await app.register(swaggerPlugin);

  // 🔥 Middleware global aplicado a TODAS as rotas
  app.addHook("onRequest", authGlobal);

  // 🔥 Rotas
  app.register(userRoutes, { prefix: "/users" });

  app.listen({ port: 4000 }, (err) => {
    if (err) throw err;
    console.log("🚀 Backend rodando em http://localhost:4000");
    console.log("📄 Swagger em http://localhost:4000/docs");
  });
}

start();
