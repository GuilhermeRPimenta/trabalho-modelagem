import prisma from "../prisma/prisma.ts";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
    console.log(req.body);

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
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
      select: {
        id: true,
        name: true,
      },
    });
    console.log(user);
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

const login = async (req: Request, res: Response) => {
  const { cpf, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        cpf,
      },
    });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      res.status(401).json({ message: "Incorrect password" });
      return;
    }
    res.status(200).json({ user, message: "Login" });
    return;
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

export { userRegister, login };
