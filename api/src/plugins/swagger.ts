import { FastifyInstance } from "fastify";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";

export default async function swaggerPlugin(app: FastifyInstance) {
  await app.register(swagger, {
    swagger: {
      info: {
        title: "API CODI",
        description: "Documentação oficial da API CODI",
        version: "1.0.0",
      },
      consumes: ["application/json"],
      produces: ["application/json"],
      securityDefinitions: {
        BearerAuth: {
          type: "apiKey",
          name: "Authorization",
          in: "header",
          description: "Use: Bearer {token}",
        },
      },
      security: [
        {
          BearerAuth: [],
        },
      ],
    },
  });

  await app.register(swaggerUI, {
    routePrefix: "/docs",
    uiConfig: {
      docExpansion: "full",
      deepLinking: false,
    },
  });
}
