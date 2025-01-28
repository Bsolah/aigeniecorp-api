import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generateAccessToken = (id: string, email: string) => {
  const token = jwt.sign({ id, email }, process.env.JWT_SECRET!, {
    expiresIn: "24h",
  });
  return token;
};

export const generateResetPasswordToken = (id: string, email: string) => {
  const token = jwt.sign({ id, email }, process.env.JWT_SECRET!, {
    expiresIn: "10m",
  });
  return token;
};

export default generateAccessToken;
