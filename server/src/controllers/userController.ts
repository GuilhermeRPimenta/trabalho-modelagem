import prisma from "../prisma/prisma.ts";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { BrazilianStates } from "@prisma/client";

type Request = express.Request;
type Response = express.Response;

const userRegister = async (req: Request, res: Response): Promise<any> => {
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

    return res.status(201).json({
      message: "Usuário criado com sucesso",
      user: { id: user.id, name: user.name },
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Erro ao criar o usuário",
      error: e.message,
    });
  }
};

const login = async (req: Request, res: Response): Promise<any> => {
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
      return res.status(400).json({ message: "Incorrect Credentials" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Incorrect Credentials" });
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

    return res.status(200).json({
      message: "Login successful",
      user: { id: user.id, name: user.name }, // Enviar dados do usuário, sem senha
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const logout = async (req: Request, res: Response): Promise<any> => {
  res.clearCookie("user_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  return res.status(200).json({ message: "Logout successful" });
};

const get = async (req: Request, res: Response): Promise<any> => {
  const token = req.cookies.user_token;
  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY!, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    return res.status(200).json({
      id: decoded.id,
      name: decoded.name,
    });
  });
};

const adminFetch = async (req: Request, res: Response): Promise<any> => {
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
            adoptedAnimals: true,
            donationAnimals: true,
          },
        },
      },
    });
    return res.status(200).json(users);
  } catch (e) {
    return res.status(500).json({ message: "Error" });
  }
};

const adminFetchUnique = async (req: Request, res: Response): Promise<any> => {
  const id = Number(req.params.id);
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        cpf: true,
        birthdate: true,
        email: true,
        phone: true,
        street: true,
        complement: true,
        number: true,
        neighborhood: true,
        city: true,
        state: true,
        postalCode: true,
        imgUrl: true,
        createdAt: true,
        donationAnimals: {
          select: {
            id: true,
            name: true,
            species: true,
            customSpecies: true,
            gender: true,
            userAdopterId: true,
            institutionAdopterId: true,
            imgUrls: true,
          },
        },
        adoptedAnimals: {
          select: {
            id: true,
            name: true,
            species: true,
            customSpecies: true,
            gender: true,
            imgUrls: true,
          },
        },
        userInstitutions: {
          include: {
            institution: true,
          },
        },
      },
    });
    const userWithFormattedImgUrls = {
      ...user,
      imgUrl: user?.imgUrl
        ? "http://localhost:" + process.env.SERVER_PORT! + user?.imgUrl
        : null,
    };
    return res.status(200).json(userWithFormattedImgUrls);
  } catch (e) {
    return res.status(500).json({ message: "Error fetching user" });
  }
};

const adminDelete = async (req: Request, res: Response): Promise<any> => {
  const id = Number(req.params.id);
  try {
    await prisma.user.delete({
      where: {
        id,
      },
    });
    return res.status(200).json({ message: "User deleted" });
  } catch (e) {
    return res.status(500).json({ message: "Failed to delete user" });
  }
};

export {
  userRegister,
  login,
  logout,
  get,
  adminFetch,
  adminFetchUnique,
  adminDelete,
};
