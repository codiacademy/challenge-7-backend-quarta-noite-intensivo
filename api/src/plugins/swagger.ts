import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";

export default fp(async function swaggerPlugin(app: FastifyInstance) {
  await app.register(swagger, {
    openapi: {
      info: {
        title: "API Documentation",
        description: "Documentação gerada automaticamente via Swagger",
        version: "1.0.0",
      },
      servers: [
        { url: "http://localhost:3000", description: "Servidor Local" }
      ],
    },
  });

  await app.register(swaggerUI, {
    routePrefix: "/docs",
    uiConfig: {
      docExpansion: "list",
      deepLinking: true,
    },
  });

  app.log.info("📄 Swagger configurado em /docs");
});
