import { Request } from "express";
import catchAsych from "../../../shared/catchAsycn";
import sendResponse from "../../../shared/sendResponse";
import { authServices } from "./auth.service";
import httpStatus from "http-status";

const loginUser = catchAsych(async (req, res) => {
  const result = await authServices.loginUser(req.body);

  const { refeshToken } = result;
  res.cookie("refeshToken", refeshToken, {
    secure: false,
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Login user successfully",
    data: {
      accessToken: result.accessToken,
      neeedPasswordChange: result.needPasswordChange,
    },
  });
});

const refreshToken = catchAsych(async (req, res) => {
  const { refeshToken } = req.cookies;

  const result = await authServices.refreshToken(refeshToken);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Login refesh successfully",
    data: result,
  });
});

const changePassword = catchAsych(
  async (req: Request & { user?: any }, res) => {
    const user = req.user;
    const result = await authServices.changePassword(user, req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Change password successfully",
      data: result,
    });
  }
);

const forgetPassword = catchAsych(async (req, res) => {
  await authServices.forgetPassword(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Forget password successfully ! Check your email",
    data: null,
  });
});

const resetPassword = catchAsych(async (req, res) => {
  const token=req.headers.authorization||""
  await authServices.resetPassword(token,req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Reset password successfully",
    data: null,
  });
});

export const authController = {
  loginUser,
  refreshToken,
  changePassword,
  forgetPassword,
  resetPassword,
};
