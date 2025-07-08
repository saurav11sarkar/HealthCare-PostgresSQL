import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

const globalError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
  res.status(statusCode).json({
    success: false,
    message: err.message || err.name || "Internal server error",
    error: err,
  });
};

export default globalError;
