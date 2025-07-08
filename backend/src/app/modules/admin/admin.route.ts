import express from "express";
import { adminController } from "./admin.controller";
import validateRequest from "../../middlewares/validationRequest";
import { adminValidation } from "./admin.validation";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.get(
  "/",
  auth(UserRole.SUPPER_ADMIN, UserRole.ADMIN),
  adminController.getAllData
);
router.get(
  "/:id",
  auth(UserRole.SUPPER_ADMIN, UserRole.ADMIN),
  adminController.getById
);

router.patch(
  "/:id",
  auth(UserRole.SUPPER_ADMIN, UserRole.ADMIN),
  validateRequest(adminValidation.updateSchema),
  adminController.updateById
);

router.delete(
  "/:id",
  auth(UserRole.SUPPER_ADMIN, UserRole.ADMIN),
  adminController.deletedById
);
router.delete(
  "/soft/:id",
  auth(UserRole.SUPPER_ADMIN, UserRole.ADMIN),
  adminController.softDeleteAdminById
);

export const adminRouter = router;
