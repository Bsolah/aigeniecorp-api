import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface DecodedToken {
  id: string;
  email: string;
}

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.authToken;
  if (!token) {
    res.status(401).send("Access denied. No token provided.");
  } else {
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET!,
      ) as DecodedToken;
      req.user = decoded;
      next();
    } catch (err) {
      res
        .status(400)
        .send("Invalid token.")
        .clearCookie("token")
        .redirect("/login");
    }
  }
};

export default authMiddleware;
