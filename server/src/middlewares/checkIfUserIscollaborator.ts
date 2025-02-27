import prisma from "../prisma/prisma.ts";
import express from "express";

type Request = express.Request;
type Response = express.Response;
type NextFunction = express.NextFunction;

const checkIfUserIsCollaborator = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const userId = parseInt(req.user.id);
  const institutionId = parseInt(req.params.id);
  try {
    const institution = await prisma.institution.findFirst({
      where: {
        id: institutionId,
        userInstitution: {
          some: {
            userId: userId,
          },
        },
      },
    });
    if (institution) {
      next();
    } else {
      return res.sendStatus(403);
    }
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

export { checkIfUserIsCollaborator };
