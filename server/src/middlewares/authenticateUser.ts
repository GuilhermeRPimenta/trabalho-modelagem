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
type VerifyErrors = jwt.VerifyErrors;
type JwtPayload = jwt.JwtPayload;

const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const token = req.cookies.user_token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  jwt.verify(
    token,
    process.env.JWT_SECRET_KEY!,
    (error: VerifyErrors | null, user: JwtPayload | string | undefined) => {
      if (error) return res.sendStatus(403);
      req.user = user;
      next();
    }
  );
};

export { authenticateUser };
