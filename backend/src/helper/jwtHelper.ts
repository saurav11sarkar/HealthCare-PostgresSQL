import jwt, { JwtPayload, Secret } from "jsonwebtoken";


const generatToken = (payload: any, secret: Secret, expiresIn: any) => {
  const token = jwt.sign(payload, secret, {
    algorithm: "HS256",
    expiresIn,
  });
  return token;
};

const verifyToken = (token: string, secret: Secret) => {
  const decoded = jwt.verify(token, secret) as JwtPayload;
  return decoded;
};

export const jwtHelper = { generatToken, verifyToken };
