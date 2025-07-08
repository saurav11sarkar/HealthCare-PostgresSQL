import express from "express";
import { authController } from "./auth.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
const router = express.Router();

router.post("/login", authController.loginUser);
router.post("/refesh-token", authController.refreshToken);
router.post(
  "/change-password",
  auth(
    UserRole.SUPPER_ADMIN,
    UserRole.ADMIN,
    UserRole.DOCTOR,
    UserRole.PATIENT
  ),
  authController.changePassword
);

router.post("/forget-password", authController.forgetPassword);
router.post("/reset-password", authController.resetPassword);

export const authRouter = router;
