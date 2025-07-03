import { NextFunction, Request, RequestHandler, Response } from "express";

const catchAsych = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);
};

export default catchAsych;
