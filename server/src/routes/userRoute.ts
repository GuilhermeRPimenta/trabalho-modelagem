import { Router } from "express";
import * as userController from "../controllers/userController.ts";
import { upload } from "../middlewares/multer.ts";
import { authenticateToken } from "../middlewares/authenticateUser.ts";
import express from "express";
const userRouter = Router();
userRouter.post(
  "/userRegister",
  upload.single("image"),
  userController.userRegister
);
userRouter.post("/login", userController.login);
userRouter.post("/logout", userController.logout);
userRouter.get("/get", userController.get);
export { userRouter };
