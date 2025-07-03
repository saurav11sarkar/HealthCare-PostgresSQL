import { UserStatus } from "@prisma/client";
import prisma from "../../../shared/prisma";
import bcrypt from "bcryptjs";
import { jwtHelper } from "../../../helper/jwtHelper";
import jwt, { JwtPayload } from "jsonwebtoken";

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
    "secret",
    "5m"
  );
  const refeshToken = jwtHelper.generatToken(
    { email: userData.email, role: userData.role },
    "refreshSecret",
    "30d"
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
    decodedData = jwtHelper.verifyToken(token, "refreshSecret");
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
    "secret",
    "5m"
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
