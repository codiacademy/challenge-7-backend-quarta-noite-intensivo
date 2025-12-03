import dotenv from "dotenv";

dotenv.config({ path: ".env.test" });

import { PrismaClient } from "../../node_modules/prisma/client-test";

export const prisma = new PrismaClient();

