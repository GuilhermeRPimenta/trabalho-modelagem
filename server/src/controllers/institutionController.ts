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

export { register, fetchForInstitutionHome };
