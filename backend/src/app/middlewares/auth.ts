import { Secret } from "jsonwebtoken";
import configs from "../../configs";
import { jwtHelper } from "../../helper/jwtHelper";
import { NextFunction, Request, Response } from "express";
import ApiError from "../errors/apiError";
import httpStatus from "http-status";

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      if (!token)
        throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized");

      const verifyUser = jwtHelper.verifyToken(
        token,
        configs.jwt.jwt_secret as Secret
      );

      if (roles.length && !roles.includes(verifyUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, "Forbidden");
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
