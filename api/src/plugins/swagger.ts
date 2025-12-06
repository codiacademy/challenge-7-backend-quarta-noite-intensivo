import { FastifyInstance } from "fastify";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";

export default async function swaggerPlugin(app: FastifyInstance) {
  await app.register(swagger, {
    openapi: {
      info: {
        title: "Codi Cash API",
        version: "1.0.0",
        description: "API documentation for Codi Cash",
      },
      components: {
        securitySchemes: {
          BearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT"
          }
        }
      }
    }
  });

  await app.register(swaggerUI, {
    routePrefix: "/api/v1/docs",
    uiConfig: {
      docExpansion: "full"
    },
    staticCSP: true
  });
}
