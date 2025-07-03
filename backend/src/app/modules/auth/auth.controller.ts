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
  const {refeshToken} = req.cookies;

  const result = await authServices.refreshToken(refeshToken);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Login refesh successfully",
    data: result,
  });
});

export const authController = {
  loginUser,
  refreshToken,
};
