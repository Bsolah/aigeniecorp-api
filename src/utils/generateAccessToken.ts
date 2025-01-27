import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generateAccessToken = (id: string, email: string) => {
  const token = jwt.sign({ id, email }, process.env.JWT_SECRET!, {
    expiresIn: "24h",
  });
  return token;
};

export default generateAccessToken;
