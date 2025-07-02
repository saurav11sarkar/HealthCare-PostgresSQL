import express from "express";
import { userRouter } from "../modules/user/user.route";
import { adminRouter } from "../modules/admin/admin.route";
const router = express.Router();

const moduleRoutes = [
  { path: "/user", name: userRouter },
  { path: "/admin", name: adminRouter },
];

moduleRoutes.forEach((rout) => router.use(rout.path, rout.name));

export default router;
