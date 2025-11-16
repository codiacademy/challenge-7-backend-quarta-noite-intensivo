import prisma  from "./../utils/prisma";
import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken}  from ".././utils/generateToken";
  
export class AuthService {
  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return null;

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return null;

    const accessToken = generateAccessToken({ userId: user.id });
    const refreshToken = generateRefreshToken({ userId: user.id });

    return { accessToken, refreshToken, user };
  }

  async refresh(refreshToken: string) {
    const decoded: any = await new Promise((resolve, reject) => {
      import("jsonwebtoken").then((jwt) =>
        jwt.verify(
          refreshToken,
          process.env.JWT_REFRESH_SECRET!,
          (err: any, decoded: any) => {
            if (err) reject(err);
            else resolve(decoded);
          }
        )
      );
    });

    const newAccessToken = generateAccessToken({ userId: decoded.userId });

    return { accessToken: newAccessToken };
  }
}

export const authService = new AuthService();
