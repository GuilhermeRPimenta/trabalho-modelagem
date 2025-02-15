import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { uploadDir } from "./src/middlewares/multer.ts";
import { router } from "./src/routes/userRoute.ts";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/uploads", express.static(uploadDir));
app.use("/user", router);

app.listen(process.env.SERVER_PORT || 8000, () => {
  console.log(`Server running on port ${process.env.SERVER_PORT || 8000}`);
});
