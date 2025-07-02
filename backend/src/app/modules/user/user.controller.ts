import { Request, Response } from "express";
import { userServices } from "./user.service";

const createAdmin = async (req: Request, res: Response) => {
  const result = await userServices.createAdmin(req.body);
  res.status(201).json({
    success: true,
    message: "Admin created successfully",
    data: result,
  });
};

export const userController = {
  createAdmin,
};
