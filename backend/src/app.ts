import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { homestyle } from "./app/utils/homePage";
import router from "./app/routers/routes";
import httpStatus from "http-status";
import cookieParser from "cookie-parser";
import globalError from "./app/middlewares/golobalError";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// router
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send(homestyle);
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Api Not Found",
    error: { path: req.originalUrl, message: "Your request path is not found" },
  });
});

app.use(globalError);
export default app;
