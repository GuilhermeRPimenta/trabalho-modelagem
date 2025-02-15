import { Router } from "express";
import * as userController from "../controllers/userController.ts";
import { upload } from "../middlewares/multer.ts";
import { authenticateToken } from "../middlewares/authenticateToken.ts";
import express from "express";
const router = Router();
router.post(
  "/userRegister",
  upload.single("image"),
  userController.userRegister
);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/get", userController.get);
export { router };
