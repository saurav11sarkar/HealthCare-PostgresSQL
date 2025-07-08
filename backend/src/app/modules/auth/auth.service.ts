import { UserStatus } from "@prisma/client";
import prisma from "../../../shared/prisma";
import bcrypt from "bcryptjs";
import { jwtHelper } from "../../../helper/jwtHelper";
import configs from "../../../configs";
import { Secret } from "jsonwebtoken";

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

export const authServices = {
  loginUser,
  refreshToken,
};
