import Fastify from "fastify";
import swaggerPlugin from "./plugins/swagger";
import userRoutes from "./routes/userRoutes";

const app = Fastify({ logger: true });

async function start() {
  await app.register(swaggerPlugin);

  app.register(userRoutes, { prefix: "/users" });

  app.listen({ port: 3000 }, (err) => {
    if (err) throw err;
    console.log("🚀 Backend rodando em: http://localhost:3000");
    console.log("📄 Swagger disponível em http://localhost:3000/docs");
  });
}

start();
