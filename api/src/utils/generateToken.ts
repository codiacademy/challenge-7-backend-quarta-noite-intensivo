import jwt, { SignOptions } from "jsonwebtoken";
import { env } from "./env";

export interface JwtPayload {
  id: number;
  email?: string;
  role?: string;
}

export function generateAccessToken(payload: JwtPayload) {
  const options: SignOptions = {
    expiresIn: "15m",
  };

  return jwt.sign(payload, env.JWT_SECRET, options);
}

export function generateRefreshToken(payload: { id: number }) {
  const options: SignOptions = {
    expiresIn: "7d",
  };

  return jwt.sign(payload, env.JWT_REFRESH_SECRET, options);
}
