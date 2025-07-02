import express from "express";
import { adminController } from "./admin.controller";
const router = express.Router();

router.get("/", adminController.getAllData);
router.get("/:id", adminController.getById);
router.patch("/:id", adminController.updateById);
router.delete("/:id", adminController.deletedById);
router.delete("/soft/:id", adminController.softDeleteAdminById);

export const adminRouter = router;
