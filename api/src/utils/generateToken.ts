import jwt from "jsonwebtoken";
import { env } from "../env";

// 🔐 Token de acesso — curta duração
export function generateAccessToken(payload: object) {
  return jwt.sign(payload, env.JWT_SECRET!, {
    expiresIn: "15m",
  });
}

// 🔐 Refresh token — longa duração
export function generateRefreshToken(payload: object) {
  return jwt.sign(payload, env.JWT_REFRESH_SECRET!, {
    expiresIn: "7d",
  });
}
