import prisma from "../prisma/prisma.ts";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

type Request = express.Request;
type Response = express.Response;

const register = async (req: Request, res: Response) => {
  try {
    const { name, birthdate, cpf, email, phone, password } = req.body;
    console.log(req.body);

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const admin = await prisma.systemAdmin.create({
      data: {
        name,
        birthdate: new Date(birthdate),
        cpf,
        email,
        phone,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
      },
    });

    res.status(201).json({
      message: "Administrador criado com sucesso",
      admin: { id: admin.id, name: admin.name },
    });
    return;
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Erro ao criar o administrador",
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
    const admin = await prisma.systemAdmin.findUnique({
      where: {
        cpf,
      },
      select: {
        id: true,
        name: true,
        password: true,
      },
    });
    if (!admin) {
      res.status(400).json({ message: "Incorrect Credentials" });
      return;
    }
    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword) {
      res.status(400).json({ message: "Incorrect Credentials" });
      return;
    }

    const accessToken = jwt.sign(
      { id: admin.id, name: admin.name },
      process.env.JWT_SECRET_KEY!
    );
    res.cookie("admin_token", accessToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    res.status(200).json({
      message: "Login successful",
      admin: { id: admin.id, name: admin.name },
    });
    return;
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

const logout = async (req: Request, res: Response) => {
  res.clearCookie("admin_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.status(200).json({ message: "Logout successful" });
  return;
};

const get = async (req: Request, res: Response) => {
  const token = req.cookies.admin_token;
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

export { register, login, logout, get };
