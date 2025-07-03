import express from "express";
import { userRouter } from "../modules/user/user.route";
import { adminRouter } from "../modules/admin/admin.route";
import { authRouter } from "../modules/auth/auth.route";
const router = express.Router();

const moduleRoutes = [
  { path: "/user", name: userRouter },
  { path: "/admin", name: adminRouter },
  { path: "/auth", name: authRouter },
];

moduleRoutes.forEach((rout) => router.use(rout.path, rout.name));

export default router;
