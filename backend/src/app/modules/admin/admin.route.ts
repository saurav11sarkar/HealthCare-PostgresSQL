import express from "express";
import { adminController } from "./admin.controller";
import validateRequest from "../../middlewares/validationRequest";
import { adminValidation } from "./admin.validation";

const router = express.Router();

router.get("/", adminController.getAllData);
router.get("/:id", adminController.getById);

router.patch(
  "/:id",
  validateRequest(adminValidation.updateSchema),
  adminController.updateById
);

router.delete("/:id", adminController.deletedById);
router.delete("/soft/:id", adminController.softDeleteAdminById);

export const adminRouter = router;
