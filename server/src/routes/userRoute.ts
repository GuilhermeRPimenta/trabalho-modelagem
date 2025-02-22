import { Router } from "express";
import * as userController from "../controllers/userController.ts";
import { upload } from "../middlewares/multer.ts";
import { authenticateAdmin } from "../middlewares/authenticateAdmin.ts";
import { authenticateUser } from "../middlewares/authenticateUser.ts";
import multer from "multer";

const userRouter = Router();
userRouter.post(
  "/userRegister",
  upload.single("image"),
  userController.userRegister
);
userRouter.post("/login", userController.login);
userRouter.post("/logout", userController.logout);
userRouter.get("/get", userController.get);
userRouter.get(
  "/fetchForEdit/:id",
  authenticateUser,
  userController.fetchForEdit
);
userRouter.get("/adminFetch", authenticateAdmin, userController.adminFetch);
userRouter.get(
  "/adminFetchUnique/:id",
  authenticateAdmin,
  userController.adminFetchUnique
);
userRouter.get(
  "/fetchForPublicProfile/:id",
  userController.fetchForPublicProfile
);
userRouter.delete(
  "/adminDelete/:id",
  authenticateAdmin,
  userController.adminDelete
);
userRouter.put(
  "/update",
  authenticateUser,
  upload.single("image"),
  userController.update
);
export { userRouter };
