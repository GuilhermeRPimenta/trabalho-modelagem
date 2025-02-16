import { BrazilianStates, SpeciesEnum } from "@prisma/client";
import prisma from "../prisma/prisma.ts";
import express from "express";

type Request = express.Request;
type Response = express.Response;

const register = async (req: Request, res: Response): Promise<any> => {
  const {
    species,
    customSpecies,
    breed,
    name,
    gender,
    birthdate,
    description,
    healthCondition,
  } = req.body;
  const age = parseInt(req.body.age);
  const weight = parseFloat(req.body.weight);
  const userId = parseInt(req.body.userId);
  const institutionId = parseInt(req.body.institutionId);
  //console.log(age);
  const imgUrls = Array.isArray(req.files)
    ? req.files.map((file) => `/uploads/animals/${file.filename}`)
    : [];
  //console.log(imgUrls);
  try {
    const animal = await prisma.animal.create({
      data: {
        species,
        customSpecies,
        breed,
        name,
        gender,
        ...(!isNaN(institutionId)
          ? { institutionDonator: { connect: { id: institutionId } } }
          : {}),
        ...(!isNaN(userId) ? { userDonator: { connect: { id: userId } } } : {}),
        ...(birthdate ? { birthdate: new Date(birthdate) } : {}),
        ...(!isNaN(age) ? { age: age } : { age: null }),
        description,
        healthCondition,
        ...(!isNaN(weight) ? { weight: weight } : { weight: null }),
        ...(institutionId ? { userInstitutionIdId: institutionId } : {}),
        imgUrls,
      },
    });
    return res.status(201).json({ message: "Animal successfully registered" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Error during animal register" });
  }
};

const fetch = async (req: Request, res: Response): Promise<any> => {
  const { state, city, species } = req.query;
  try {
    const animals = await prisma.animal.findMany({
      where: {
        ...(species ? { species: species as SpeciesEnum } : {}),
        OR: [
          {
            userDonator: {
              ...(state ? { state: state as BrazilianStates } : {}),
              ...(city ? { city: String(city) } : {}),
            },
          },
          {
            institutionDonator: {
              ...(state ? { state: state as BrazilianStates } : {}),
              ...(city ? { city: String(city) } : {}),
            },
          },
        ],
      },
      include: {
        userDonator: {
          select: {
            neighborhood: true,
            city: true,
            state: true,
          },
        },
        institutionDonator: {
          select: {
            neighborhood: true,
            city: true,
            state: true,
          },
        },
      },
    });
    const formattedAnimals = animals.map((animal) => {
      const formattedUrls = animal.imgUrls.map((url) => {
        return "http://localhost:" + process.env.SERVER_PORT! + url;
      });
      let donator = { neighborhood: "", city: "", state: "" };
      if (animal.userDonator) {
        donator = { ...animal.userDonator };
      } else if (animal.institutionDonator) {
        donator = { ...animal.institutionDonator };
      }

      return { ...animal, donator: donator, imgUrls: formattedUrls };
    });
    return res.status(200).json(formattedAnimals);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ messagem: "Error fetching animals" });
  }
};

export { register, fetch };
