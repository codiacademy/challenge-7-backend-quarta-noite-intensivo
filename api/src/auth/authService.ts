import prisma from "../utils/prisma";
import { comparePassword } from "../utils/hash";
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken";
import jwt from "jsonwebtoken";
import { env } from "../utils/env";

export class AuthService {
  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return null;

    const valid = await comparePassword(password, user.password);
    if (!valid) return null;

    const { password: _, ...userSafe } = user;

    const accessToken = generateAccessToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    const refreshToken = generateRefreshToken({ id: user.id });

    return { accessToken, refreshToken, user: userSafe };
  }

  async refresh(token: string) {
    try {
      const decoded = jwt.verify(token, env.JWT_REFRESH_SECRET) as { id: number };
      const newAccess = generateAccessToken({
        id: decoded.id,
        email: "",
        role: ""
      });
      return { accessToken: newAccess };
    } catch {
      throw new Error("Invalid refresh token");
    }
  }
}

export const authService = new AuthService();
