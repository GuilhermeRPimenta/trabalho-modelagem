import { Router } from "express";
import * as institutionController from "../controllers/institutionController.ts";
import { upload } from "../middlewares/multer.ts";
import { authenticateUser } from "../middlewares/authenticateUser.ts";
import { checkIfUserIsCollaborator } from "../middlewares/checkIfUserIsCollaborator.ts";
const institutionRouter = Router();

institutionRouter.post(
  "/register",
  authenticateUser,
  upload.single("image"),
  institutionController.register
);

institutionRouter.get(
  "/fetchForInstitutionHome/:id",
  authenticateUser,
  checkIfUserIsCollaborator,
  institutionController.fetchForInstitutionHome
);

export { institutionRouter };
