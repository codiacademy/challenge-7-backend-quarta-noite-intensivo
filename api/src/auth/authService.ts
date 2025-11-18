import prisma from "../utils/prisma";
import bcrypt from "bcryptjs";
import { 
  generateAccessToken, 
  generateRefreshToken 
} from "../utils/generateToken";
import jwt from "jsonwebtoken";

export class AuthService {
  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return null;

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return null;

    // Remover password do retorno
    const { password: _, ...userSafe } = user;

    const accessToken = generateAccessToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    const refreshToken = generateRefreshToken({
      id: user.id,
    });

    return { accessToken, refreshToken, user: userSafe };
  }

  async refresh(refreshToken: string) {
    try {
      const decoded = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET as string
      ) as { id: number };

      const newAccessToken = generateAccessToken({
        id: decoded.id,
      });

      return { accessToken: newAccessToken };
    } catch (err) {
      throw new Error("Invalid refresh token");
    }
  }
}

export const authService = new AuthService();
