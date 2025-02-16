import { Router } from "express";
import * as userController from "../controllers/userController.ts";
import { upload } from "../middlewares/multer.ts";
import { authenticateAdmin } from "../middlewares/authenticateAdmin.ts";

const userRouter = Router();
userRouter.post(
  "/userRegister",
  upload.single("image"),
  userController.userRegister
);
userRouter.post("/login", userController.login);
userRouter.post("/logout", userController.logout);
userRouter.get("/get", userController.get);
userRouter.get("/fetch", authenticateAdmin, userController.fetch);
export { userRouter };
