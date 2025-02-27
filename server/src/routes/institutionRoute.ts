import { Router } from "express";
import * as institutionController from "../controllers/institutionController.ts";
import { upload } from "../middlewares/multer.ts";
import { authenticateUser } from "../middlewares/authenticateUser.ts";
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
  institutionController.fetchForInstitutionHome
);

export { institutionRouter };
