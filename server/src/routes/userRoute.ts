import { Router } from "express";
import * as userController from "../controllers/userController.ts";
import { upload } from "../middlewares/multer.ts";
const router = Router();
router.post(
  "/userRegister",
  upload.single("image"),
  userController.userRegister
);
export { router };
