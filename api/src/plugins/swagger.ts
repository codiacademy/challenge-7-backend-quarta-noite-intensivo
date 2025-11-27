import { FastifyInstance } from "fastify";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";

export default async function swaggerPlugin(app: FastifyInstance) {
  await app.register(swagger, {
    swagger: {
      info: {
        title: "Codi Cash API",
        version: "1.0.0",
        description: "API documentation for Codi Cash",
      },
      consumes: ["application/json"],
      produces: ["application/json"],
      securityDefinitions: {
        BearerAuth: { type: "apiKey",
           name: "Authorization", 
           in:"header",
           description: "Bearer {token}" }
      }
    }
  });

  await app.register(swaggerUI, {
    routePrefix: "/api/v1/docs",
    uiConfig: { docExpansion: "full" },
    staticCSP: true,
  });
}
