import { buildApp } from "./app";

async function start() {
  const app = await buildApp();
    app.listen({ port: 4000 }, (err) => {
    if (err) 
      throw err;
    console.log("🚀 Backend rodando em http://localhost:4000");
    console.log("📄 Swagger em http://localhost:4000/docs");
  });
}
start();
