import { Router } from "express";
import * as institutionController from "../controllers/institutionController.ts";
import { upload } from "../middlewares/multer.ts";
import { authenticateUser } from "../middlewares/authenticateUser.ts";
import { checkIfUserIsCollaborator } from "../middlewares/checkIfUserIsCollaborator.ts";
import { authenticateAdmin } from "../middlewares/authenticateAdmin.ts";
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

institutionRouter.get(
  "/fetchForInstitutionAdmin/:id",
  authenticateUser,
  checkIfUserIsCollaborator,
  institutionController.fetchForInstitutionAdminstrationPage
);

institutionRouter.post(
  "/addCollaborator/:id",
  authenticateUser,
  checkIfUserIsCollaborator,
  institutionController.addCollaborator
);

institutionRouter.delete(
  "/removeCollaborator/:id",
  authenticateUser,
  checkIfUserIsCollaborator,
  institutionController.removeCollaborator
);

institutionRouter.get(
  "/:institutionId/fetchRequests",
  authenticateUser,
  institutionController.fetchRequests
);

institutionRouter.get("/fetch", institutionController.fetch);

institutionRouter.get(
  "/fetch/:institutionId",
  authenticateAdmin,
  institutionController.fetchUnique
);

institutionRouter.get(
  "/adminFetchUnique/:id",
  authenticateAdmin,
  institutionController.adminFetchUnique
);

export { institutionRouter };
