// src/env.ts
import * as dotenv from "dotenv";
import { z } from "zod";

// Carrega .env em desenvolvimento (quando estiver usando docker/production, as vars normalmente já estarão definidas)
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().default(4000),
  DATABASE_URL: z.string().nonempty(),
  JWT_SECRET: z.string().min(10),
  JWT_REFRESH_SECRET: z.string().min(10),
  JWT_EXPIRES_IN: z.string().default("15m"),
  JWT_REFRESH_EXPIRES_IN: z.string().default("7d"),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("❌ Variaveis de ambiente invalidas:", _env.error.format());
  throw new Error("Variaveis de ambiente invalidas. Vai nos logs para mais detalhes.");
}

export const env = {
  NODE_ENV: _env.data.NODE_ENV,
  PORT: _env.data.PORT,
  DATABASE_URL: _env.data.DATABASE_URL,
  JWT_SECRET: _env.data.JWT_SECRET as string,
  JWT_REFRESH_SECRET: _env.data.JWT_REFRESH_SECRET as string,
  JWT_EXPIRES_IN: _env.data.JWT_EXPIRES_IN,
  JWT_REFRESH_EXPIRES_IN: _env.data.JWT_REFRESH_EXPIRES_IN,
};
