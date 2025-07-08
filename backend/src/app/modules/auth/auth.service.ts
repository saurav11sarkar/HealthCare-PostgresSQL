import { UserStatus } from "@prisma/client";
import prisma from "../../../shared/prisma";
import bcrypt from "bcryptjs";
import { jwtHelper } from "../../../helper/jwtHelper";
import configs from "../../../configs";
import { Secret } from "jsonwebtoken";
import ApiError from "../../errors/apiError";
import httpStatus from "http-status";

const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: { email: payload.email, status: UserStatus.ACTIVE },
  });
  const isCurretPassword: boolean = await bcrypt.compare(
    payload.password,
    userData.password
  );
  if (!isCurretPassword) {
    throw new Error("Password is incorrect");
  }

  const accessToken = jwtHelper.generatToken(
    { email: userData.email, role: userData.role },
    configs.jwt.jwt_secret as Secret,
    configs.jwt.jwt_expires_in
  );
  const refeshToken = jwtHelper.generatToken(
    { email: userData.email, role: userData.role },
    configs.jwt.jwt_refresh_secret as Secret,
    configs.jwt.jwt_refresh_exprires_in
  );

  return {
    accessToken: accessToken,
    refeshToken: refeshToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

const refreshToken = async (token: string) => {
  let decodedData;
  try {
    decodedData = jwtHelper.verifyToken(
      token,
      configs.jwt.jwt_refresh_secret as Secret
    );
  } catch (error) {
    throw new Error("You are not authorized");
  }
  const isUserExist = await prisma.user.findUnique({
    where: { email: decodedData.email, status: UserStatus.ACTIVE },
  });
  if (!isUserExist) {
    throw new Error("You are not authorized");
  }
  const accessToken = jwtHelper.generatToken(
    { email: isUserExist.email, role: isUserExist.role },
    configs.jwt.jwt_secret as Secret,
    configs.jwt.jwt_expires_in
  );

  return {
    accessToken: accessToken,
    needPasswordChange: isUserExist.needPasswordChange,
  };
};

const changePassword = async (user: any, payload: any) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: { email: user.email, status: UserStatus.ACTIVE },
  });

  const isCorretPassword: boolean = await bcrypt.compare(
    payload.oldPassword,
    userData.password
  );
  if (!isCorretPassword) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Old password is incorrect");
  }
  const hashPassword: string = await bcrypt.hash(payload.newPassword, 10);

  await prisma.user.update({
    where: { email: userData.email },
    data: {
      password: hashPassword,
      needPasswordChange: false,
    },
  });

  return {
    message: "Password changed successfully",
  };
};

const forgetPassword = async (payload: { email: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: { email: payload.email, status: UserStatus.ACTIVE },
  });

  const resetPasswordToken = jwtHelper.generatToken(
    { email: userData.email, role: userData.role },
    configs.jwt.reset_password_token as Secret,
    configs.jwt.reset_password_exprires_in
  );
  console.log(resetPasswordToken);
};

export const authServices = {
  loginUser,
  refreshToken,
  changePassword,
  forgetPassword,
};
