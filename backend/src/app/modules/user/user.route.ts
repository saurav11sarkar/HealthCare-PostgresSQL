import express, { NextFunction, Request, Response } from "express";
import { userController } from "./user.controller";
import { jwtHelper } from "../../../helper/jwtHelper";
import configs from "../../../configs";
import { Secret } from "jsonwebtoken";
const router = express.Router();

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      if (!token) throw new Error("You are not authorized");

      const verifyUser = jwtHelper.verifyToken(
        token,
        configs.jwt.jwt_secret as Secret
      );

      if (roles.length && !roles.includes(verifyUser.role)) {
        throw new Error("You are not authorized");
      }
      
      next();
    } catch (error) {
      next(error);
    }
  };
};

router.post(
  "/create",
  auth("ADMIN", "SUPPER_ADMIN", "DOCTOR"),
  userController.createAdmin
);

export const userRouter = router;
