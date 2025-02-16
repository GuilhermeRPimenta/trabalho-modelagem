import prisma from "../prisma/prisma.ts";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { BrazilianStates } from "@prisma/client";

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

    res.status(201).json({
      message: "Usuário criado com sucesso",
      user: { id: user.id, name: user.name },
    });
    return;
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Erro ao criar o usuário",
      error: e.message,
    });
    return;
  }
};

const login = async (req: Request, res: Response) => {
  console.log(req.body);
  const cpf = String(req.body.cpf);
  const password = String(req.body.password);
  try {
    const user = await prisma.user.findUnique({
      where: {
        cpf,
      },
      select: {
        id: true,
        name: true,
        password: true,
      },
    });
    if (!user) {
      res.status(400).json({ message: "Incorrect Credentials" });
      return;
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      res.status(400).json({ message: "Incorrect Credentials" });
      return;
    }

    const accessToken = jwt.sign(
      { id: user.id, name: user.name },
      process.env.JWT_SECRET_KEY!
    );
    res.cookie("user_token", accessToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    res.status(200).json({
      message: "Login successful",
      user: { id: user.id, name: user.name }, // Enviar dados do usuário, sem senha
    });
    return;
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

const logout = async (req: Request, res: Response) => {
  res.clearCookie("user_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.status(200).json({ message: "Logout successful" });
  return;
};

const get = async (req: Request, res: Response) => {
  const token = req.cookies.user_token;
  if (!token) {
    res.status(401).json({ message: "Not authenticated" });
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY!, (err, decoded) => {
    if (err) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }
    res.status(200).json({
      id: decoded.id,
      name: decoded.name,
    });
    return;
  });
};

const fetch = async (req: Request, res: Response) => {
  const { state, city } = req.query;
  try {
    const users = await prisma.user.findMany({
      where: {
        ...(state ? { state: state as BrazilianStates } : {}),
        ...(city ? { city: String(city) } : {}),
      },
      select: {
        id: true,
        name: true,
        street: true,
        neighborhood: true,
        city: true,
        state: true,
        createdAt: true,
        _count: {
          select: {
            adopterAnimals: true,
            donationAnimals: true,
          },
        },
      },
    });
    res.status(200).json(users);
    return;
  } catch (e) {
    res.status(500).json({ message: "Error" });
    return;
  }
};

export { userRegister, login, logout, get, fetch };
