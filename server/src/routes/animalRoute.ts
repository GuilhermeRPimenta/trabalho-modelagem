import { Router } from "express";
import * as animalController from "../controllers/animalController.ts";
import { upload } from "../middlewares/multer.ts";
import { authenticateUser } from "../middlewares/authenticateUser.ts";
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
animalRouter.post(
  "/createAdoptionRequest",
  authenticateUser,
  animalController.createAdoptionRequest
);

export { animalRouter };
