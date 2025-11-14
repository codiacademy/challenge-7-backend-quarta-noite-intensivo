import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

// CREATE USER
router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;

    if (!name || !email)
      return res
        .status(400)
        .json({ error: "Nome e email são obrigatórios." });

    const user = await prisma.user.create({
      data: { name, email },
    });

    return res.status(201).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao criar usuário." });
  }
});

// READ ALL USERS
router.get("/", async (_req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar usuários." });
  }
});

// READ USER BY ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id))
      return res.status(400).json({ error: "ID inválido." });

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user)
      return res.status(404).json({ error: "Usuário não encontrado." });

    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar usuário." });
  }
});

// UPDATE USER
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { name, email } = req.body;

    if (isNaN(id))
      return res.status(400).json({ error: "ID inválido." });

    const user = await prisma.user.update({
      where: { id },
      data: { name, email },
    });

    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao atualizar usuário." });
  }
});

// DELETE USER
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id))
      return res.status(400).json({ error: "ID inválido." });

    await prisma.user.delete({
      where: { id },
    });

    return res.json({ message: "Usuário deletado com sucesso." });
  } catch (error) {
    return res.status(500).json({ error: "Erro ao deletar usuário." });
  }
});

export default router;
