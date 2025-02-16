import express from "express";
import jwt from "jsonwebtoken";

declare module "express-serve-static-core" {
  interface Request {
    user?: any;
  }
}

type Request = express.Request;
type Response = express.Response;
type NextFunction = express.NextFunction;

const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req);
  const token = req.cookies.user_token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET_KEY!, (error, user) => {
    if (error) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

export { authenticateToken };
