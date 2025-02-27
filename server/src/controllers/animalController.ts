import { BrazilianStates, Prisma, SpeciesEnum } from "@prisma/client";
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
        ...(!isNaN(institutionId)
          ? { institutionDonator: { connect: { id: institutionId } } }
          : {}),
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
  const userDonatorId = parseInt(req.query.userDonatorId as string);
  const institutionDonatorId = parseInt(
    req.query.institutionDonatorId as string
  );
  const userAdopterId = parseInt(req.query.userAdopterId as string);
  const institutionAdopterId = parseInt(
    req.query.institutionAdopterId as string
  );
  const donated =
    req.query.donated !== undefined ? req.query.donated === "true" : undefined;
  try {
    const animals = await prisma.animal.findMany({
      where: {
        AND: [
          ...(species ? [{ species: species as SpeciesEnum }] : []),
          ...(!isNaN(userDonatorId) ? [{ userDonatorId }] : []),
          ...(!isNaN(institutionDonatorId) ? [{ institutionDonatorId }] : []),
          ...(!isNaN(userAdopterId) ? [{ userAdopterId }] : []),
          ...(!isNaN(institutionAdopterId) ? [{ institutionAdopterId }] : []),
          ...(typeof donated === "boolean"
            ? donated
              ? [
                  {
                    OR: [
                      { userAdopterId: { not: null } },
                      { institutionAdopterId: { not: null } },
                    ],
                  },
                ]
              : [{ userAdopterId: null, institutionAdopterId: null }]
            : []),
          ...(state || city
            ? [
                {
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
              ]
            : []),
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
    return res.status(500).json({ message: "Error fetching animals" });
  }
};

const fetchUserAnimalsInDonation = async (
  req: Request,
  res: Response
): Promise<any> => {
  const userId = parseInt(req.user.id);
  const animals = await prisma.animal.findMany({
    where: {
      userDonatorId: userId,
      userAdopterId: null,
      institutionAdopterId: null,
    },
    include: {
      adoptionRequests: true,
    },
  });
  const formattedAnimals = animals.map((animal) => {
    const formattedUrls = animal.imgUrls.map((url) => {
      return "http://localhost:" + process.env.SERVER_PORT! + url;
    });

    return { ...animal, imgUrls: formattedUrls };
  });
  return res.status(200).json(formattedAnimals);
};

const fetchPublic = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  try {
    const animal = await prisma.animal.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        userDonator: true,
        institutionDonator: true,
      },
    });
    if (!animal) {
      return res.status(404).json({ message: "Animal not found" });
    }
    const formattedUrls = animal.imgUrls.map((url) => {
      return "http://localhost:" + process.env.SERVER_PORT! + url;
    });
    const donatorType = animal?.userDonatorId ? "USER" : "INSTITUTION";
    if (donatorType === "USER") {
      const formattedAnimal = {
        id: animal.id,
        name: animal.name,
        species: animal.species,
        customSpecies: animal.customSpecies,
        breed: animal.breed,
        gender: animal.gender,
        birthdate: animal.birthdate,
        age: animal.age,
        description: animal.description,
        healthCondition: animal.healthCondition,
        weight: animal.weight,
        imgUrls: formattedUrls,
        donatorType: donatorType,
        donator: {
          id: animal.userDonatorId,
          name: animal.userDonator?.name,
          neighborhood: animal.userDonator?.neighborhood,
          city: animal.userDonator?.city,
          state: animal.userDonator?.state,
        },
      };
      return res.status(200).json(formattedAnimal);
    } else {
      const formattedAnimal = {
        id: animal.id,
        name: animal.name,
        species: animal.species,
        customSpecies: animal.customSpecies,
        breed: animal.breed,
        gender: animal.gender,
        birthdate: animal.birthdate,
        age: animal.age,
        description: animal.description,
        healthCondition: animal.healthCondition,
        weight: animal.weight,
        imgUrls: formattedUrls,
        donatorType: donatorType,
        donator: {
          id: animal.institutionDonatorId,
          name: animal.institutionDonator?.name,
          neighborhood: animal.institutionDonator?.neighborhood,
          city: animal.institutionDonator?.city,
          state: animal.institutionDonator?.state,
        },
      };
      return res.status(200).json(formattedAnimal);
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Error fetching animal" });
  }
};

const createAdoptionRequest = async (
  req: Request,
  res: Response
): Promise<any> => {
  const userIdAuth = parseInt(req.user.id);
  const { animalId, notes, person } = req.body;
  console.log(req.body);
  let userId: number | null = null;
  let institutionId: number | null = null;
  if (person === "%USER") {
    userId = userIdAuth;
  } else {
    institutionId = parseInt(person);
  }
  if (!userId && !institutionId) {
    return res.status(403).json({ message: "No adopter provided" });
  }
  try {
    const data: any = {
      notes,
      animal: { connect: { id: parseInt(animalId) } },
    };

    if (userId) data.user = { connect: { id: userId } };
    if (institutionId) data.institution = { connect: { id: institutionId } };

    const adoptionRequest = await prisma.adoptionRequest.create({ data });
    return res.status(201).json();
  } catch (e) {
    console.log(e);
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res
          .status(409)
          .json({ message: "Adoption request already exists" });
      }
    }
    return res.status(500).json({ message: "Error creating adoption request" });
  }
};

export {
  register,
  fetch,
  fetchPublic,
  fetchUserAnimalsInDonation,
  createAdoptionRequest,
};
