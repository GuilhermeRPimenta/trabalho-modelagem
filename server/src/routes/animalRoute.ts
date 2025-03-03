import { Router } from "express";
import * as animalController from "../controllers/animalController.ts";
import { upload } from "../middlewares/multer.ts";
import { authenticateUser } from "../middlewares/authenticateUser.ts";
import { checkIfUserIsCollaborator } from "../middlewares/checkIfUserIsCollaborator.ts";
import express from "express";
const animalRouter = Router();
animalRouter.post(
  "/register",
  authenticateUser,
  upload.array("images", 10),
  animalController.register
);
animalRouter.get("/fetch", animalController.fetch);
animalRouter.get("/fetchPublic/:id", animalController.fetchPublic);
animalRouter.get(
  "/fetchUserAnimalsInDonation",
  authenticateUser,
  animalController.fetchUserAnimalsInDonation
);
animalRouter.get(
  "/fetchInstitutionAnimalsInDonation/:institutionId",
  authenticateUser,
  animalController.fetchInstitutionAnimalsInDonation
);
animalRouter.post(
  "/createAdoptionRequest",
  authenticateUser,
  animalController.createAdoptionRequest
);
animalRouter.get(
  "/fetchForAnimalInDonationPage/:id",
  authenticateUser,
  animalController.fetchForAnimalInDonationPage
);
animalRouter.post(
  "/confirmDonation",
  authenticateUser,
  animalController.donationConfirm
);

export { animalRouter };
