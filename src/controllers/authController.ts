import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from "../models/User";
import { generateResetPasswordToken } from "../utils/generateAccessToken";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).send("User registered successfully.");
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      res.status(400).send("Invalid email or password.");
    } else {
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET!,
        { expiresIn: "1h" }
      );

      // Set HTTP-only cookie
      res.cookie("authToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Ensure it's secure in production
        sameSite: "strict", // Prevent CSRF attacks
        maxAge: 3600000, // 1 hour
      });

      res.json({ message: "Login successful", data: { user, token } });
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("authToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Matches the secure flag of the cookie
      sameSite: "strict", // Matches the sameSite flag of the cookie
    });
    res.json({ message: "Logged out successfully" });
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const token = generateResetPasswordToken(String(user._id), user.email);
      res.json({
        message: "Password reset link sent to email",
        data: `http://localhost:5000/api/auth/reset-password/${token}`,
      });
    } else {
      res.status(404).send("User not found.");
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { password } = req.body;
    const token = req.params.token;
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const user = await User.findById(decoded.id);
    if (user) {
      user.password = password;
      await user.save();
      res.json({ message: "Password reset successful" });
    } else {
      res.status(404).send("User not found.");
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};