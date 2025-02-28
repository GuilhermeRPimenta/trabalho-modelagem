import prisma from "../prisma/prisma.ts";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { BrazilianStates } from "@prisma/client";

type Request = express.Request;
type Response = express.Response;

type PersonType = "USER" | "INSTITUTION";

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
    const imgUrl = req.file ? `/uploads/users/${req.file.filename}` : null;
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
        cpf: true,
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
      { id: user.id, name: user.name, cpf: user.cpf },
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
      cpf: decoded.cpf,
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
    user?.userInstitutions.forEach((ui) => {
      ui.institution.imgUrl = ui.institution.imgUrl
        ? "http://localhost:" + process.env.SERVER_PORT! + ui.institution.imgUrl
        : null;
    });
    user?.adoptedAnimals.forEach((animal) => {
      animal.imgUrls = animal.imgUrls.map(
        (imgUrl) => "http://localhost:" + process.env.SERVER_PORT! + imgUrl
      );
    });

    user?.donationAnimals.forEach((animal) => {
      animal.imgUrls = animal.imgUrls.map(
        (imgUrl) => "http://localhost:" + process.env.SERVER_PORT! + imgUrl
      );
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

const fetchForEdit = async (req: Request, res: Response): Promise<any> => {
  const id = Number(req.params.id);
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        name: true,
        birthdate: true,
        cpf: true,
        email: true,
        phone: true,
        state: true,
        city: true,
        street: true,
        number: true,
        complement: true,
        neighborhood: true,
        postalCode: true,
        imgUrl: true,
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
    return res.status(500).json({ message: "Error fetching user data" });
  }
};

const fetchForPublicProfile = async (
  req: Request,
  res: Response
): Promise<any> => {
  const id = Number(req.params.id);
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        name: true,
        state: true,
        city: true,
        neighborhood: true,
        imgUrl: true,
        donationAnimals: {
          select: {
            id: true,
            name: true,
            species: true,
            customSpecies: true,
            gender: true,
            imgUrls: true,
          },
        },
      },
    });
    const formattedAnimals = user?.donationAnimals.map((animal) => {
      const formattedUrls = animal.imgUrls.map((url) => {
        return "http://localhost:" + process.env.SERVER_PORT! + url;
      });
      return { ...animal, imgUrls: formattedUrls };
    });
    const userWithFormattedImgUrls = user?.imgUrl
      ? {
          ...user,
          donationAnimals: formattedAnimals,
          imgUrl: user?.imgUrl
            ? "http://localhost:" + process.env.SERVER_PORT! + user?.imgUrl
            : null,
        }
      : user;
    return res.status(200).json(userWithFormattedImgUrls);
  } catch (e) {
    return res.status(500).json({ message: "Error fetcing user data" });
  }
};

const update = async (req: Request, res: Response): Promise<any> => {
  const {
    id,
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
    changePassword,
    changeImage,
    password,
  } = req.body;
  console.log(req.body);
  try {
    let hashedPassword = "";
    if (changePassword) {
      const salt = await bcrypt.genSalt();
      hashedPassword = await bcrypt.hash(password, salt);
    }
    let imgUrl: string | null = "";
    if (changeImage) {
      imgUrl = req.file ? `/uploads/users/${req.file.filename}` : null;
    }
    console.log(imgUrl);
    const user = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        birthdate: new Date(birthdate),
        cpf,
        email,
        phone,
        state,
        city,
        street,
        number: Number(number),
        complement,
        neighborhood,
        postalCode,
        ...(changePassword ? { password: hashedPassword } : {}),
        ...(changeImage ? { imgUrl } : {}),
      },
    });
    console.log(user);
    return res.status(200).json({ message: "User updated" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Error during user update" });
  }
};

const fetchInstitutions = async (req: Request, res: Response): Promise<any> => {
  const userId = parseInt(req.user.id);
  try {
    const institutions = await prisma.institution.findMany({
      where: {
        userInstitution: {
          some: {
            userId: userId,
          },
        },
      },
      select: {
        id: true,
        name: true,
        neighborhood: true,
        city: true,
        state: true,
        imgUrl: true,
        userInstitution: {
          select: {
            role: true,
          },
        },
      },
    });
    const formattedInstitutions = institutions.map((institution) => {
      const formattedUrl =
        "http://localhost:" + process.env.SERVER_PORT! + institution.imgUrl;

      return { ...institution, imgUrl: formattedUrl };
    });
    return res.status(200).json(formattedInstitutions);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Error during institutions fetch" });
  }
};

const fetchRequests = async (req: Request, res: Response): Promise<any> => {
  const userId = parseInt(req.user.id);
  try {
    const requests = await prisma.adoptionRequest.findMany({
      where: {
        userId,
      },
      include: {
        animal: true,
      },
    });
    requests.forEach((req) => {
      req.animal.imgUrls = req.animal.imgUrls.map((url) => {
        return "http://localhost:" + process.env.SERVER_PORT! + url;
      });
    });
    return res.status(200).json(requests);
  } catch (e) {
    console.log(e);
    return res.status(500).json();
  }
};

const deleteRequest = async (req: Request, res: Response): Promise<any> => {
  const id = req.params.id;
  try {
    const requests = await prisma.adoptionRequest.delete({
      where: {
        id: parseInt(id),
      },
    });

    return res.status(200).json();
  } catch (e) {
    console.log(e);
    return res.status(500).json();
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
  fetchForEdit,
  update,
  fetchForPublicProfile,
  fetchInstitutions,
  fetchRequests,
  deleteRequest,
};
