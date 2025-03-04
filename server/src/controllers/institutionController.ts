import prisma from "../prisma/prisma.ts";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

type Request = express.Request;
type Response = express.Response;

const register = async (req: Request, res: Response): Promise<any> => {
  const userId = parseInt(req.user.id);
  const {
    name,
    cnpj,
    email,
    phone,
    state,
    city,
    street,
    number,
    complement,
    neighborhood,
    postalCode,
    foundationDate,
  } = req.body;
  const imgUrl = req.file ? `/uploads/institutions/${req.file.filename}` : null;
  console.log(req.body);
  console.log(imgUrl);
  try {
    const institution = await prisma.institution.create({
      data: {
        name,
        cnpj,
        email,
        phone,
        state,
        city,
        street,
        number: parseInt(number),
        complement,
        neighborhood,
        postalCode,
        foundationDate: new Date(foundationDate),
        imgUrl,
        userInstitution: {
          create: {
            user: {
              connect: { id: userId },
            },
            role: "ADMIN",
          },
        },
      },
    });
    return res.status(201).json({
      message: "instituição criada com sucesso",
      institution: { institution },
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Erro ao criar a instituição",
      error: e.message,
    });
  }
};

const fetchForInstitutionHome = async (
  req: Request,
  res: Response
): Promise<any> => {
  const userId = parseInt(req.user.id);
  const institutionId = parseInt(req.params.id);
  try {
    const institution = await prisma.institution.findUnique({
      where: {
        id: institutionId,
      },
      include: {
        userInstitution: {
          where: {
            userId: userId,
          },
        },
      },
    });
    return res.status(200).json(institution);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e });
  }
};

const fetchForInstitutionAdminstrationPage = async (
  req: Request,
  res: Response
): Promise<any> => {
  const institutionId = parseInt(req.params.id);
  try {
    const institution = await prisma.institution.findUnique({
      where: {
        id: institutionId,
      },
      include: {
        userInstitution: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                cpf: true,
              },
            },
          },
        },
      },
    });
    return res.status(200).json(institution);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e });
  }
};

const addCollaborator = async (req: Request, res: Response): Promise<any> => {
  const { cpf, institutionId } = req.body;
  console.log(req.body);
  try {
    const user = await prisma.user.findUnique({
      where: {
        cpf: cpf,
      },
      select: {
        id: true,
        name: true,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const userInstitution = await prisma.userInstitution.create({
      data: {
        user: { connect: { id: user?.id } },
        institution: { connect: { id: parseInt(institutionId) } },
        role: "COLLABORATOR",
      },
    });
    return res.status(200).json(user);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e });
  }
};

const removeCollaborator = async function name(
  req: Request,
  res: Response
): Promise<any> {
  const { userId, institutionId } = req.body;
  try {
    await prisma.userInstitution.delete({
      where: {
        institutionId_userId: {
          userId: parseInt(userId),
          institutionId: parseInt(institutionId),
        },
      },
    });
    return res.status(200).json();
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e });
  }
};

const fetchRequests = async (req: Request, res: Response): Promise<any> => {
  const institutionId = parseInt(req.params.institutionId);
  try {
    const requests = await prisma.adoptionRequest.findMany({
      where: {
        institutionId,
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

export {
  register,
  fetchForInstitutionHome,
  fetchForInstitutionAdminstrationPage,
  addCollaborator,
  removeCollaborator,
  fetchRequests,
};
