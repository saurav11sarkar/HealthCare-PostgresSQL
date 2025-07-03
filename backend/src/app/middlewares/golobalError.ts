import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

const globalError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: err.message || err.name || "Internal server error",
    error: err,
  });
};

export default globalError;
