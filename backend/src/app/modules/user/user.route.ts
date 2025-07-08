import express from "express";
import { userController } from "./user.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
const router = express.Router();

router.post(
  "/create",
  auth(UserRole.SUPPER_ADMIN, UserRole.ADMIN),
  userController.createAdmin
);

export const userRouter = router;
