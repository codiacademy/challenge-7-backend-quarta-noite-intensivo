import { FastifyInstance,FastifyReply,FastifyRequest} from "fastify";
import { authService } from "./authController";

export default async function authRoutes(fastify: FastifyInstance) {
  fastify.post("/api/v1/auth", async (req: FastifyRequest<{ Body: { email: string; password: string}}>,
    reply: FastifyReply) => {
      
      const {email, password}= req.body;
      
      const result = await authService.login(email, password);
      if (!result) {
        return reply.status(401).send({ message: "Credenciais Inválidas" });
      }
  
      return reply.send(result);
    }
  );
}
