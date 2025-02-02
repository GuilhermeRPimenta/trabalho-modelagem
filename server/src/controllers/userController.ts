import prisma from "../prisma/prisma.ts";
import express from "express";
import bcrypt from "bcrypt";

type Request = express.Request;
type Response = express.Response;

const userRegister = async (req: Request, res: Response) => {
  try {
    const {
      name,
      birthdate,
      cpf,
      email,
      phone,
      state,
      city,
      street,
      number,
      complement,
      neighborhood,
      postalCode,
      password,
    } = req.body;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const imgUrl = req.file ? `/uploads/${req.file.filename}` : null;
    const user = await prisma.user.create({
      data: {
        name,
        birthdate: new Date(birthdate),
        cpf,
        email,
        phone,
        state,
        city,
        street,
        number: parseInt(number),
        complement,
        neighborhood,
        postalCode,
        password: hashedPassword,
        imgUrl,
      },
    });
    res.status(201).json({
      message: "Usuário criado com sucesso",
      user: { id: user.id, name: user.name },
    });
    return;
  } catch (e) {
    res.status(500).json({
      message: "Erro ao criar o usuário",
      error: e.message,
    });
    return;
  }
};

export { userRegister };
