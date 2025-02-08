import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";
import { generateResetPasswordToken } from "../utils/generateAccessToken";
import generateSecurePassword from "../utils/generateAndHashSocialAuthPassword";
import Invitation from "../models/Invitation";
import mongoose from "mongoose";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password, role, status } = req.body;
    const user = new User({ username, email, password, role, status });
    await user.save();
    res.status(201).send({ message: "Registration successful", data: null });
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
        { expiresIn: "1h" },
      );

      // // Set HTTP-only cookie
      // res.cookie("authToken", token, {
      //   httpOnly: true,
      //   secure: true,// process.env.NODE_ENV === "production", // Ensure it's secure in production
      //   sameSite: "none", // "strict", // Prevent CSRF attacks
      //   maxAge: 3600000, // 1 hour
      // });

      const isProduction = process.env.NODE_ENV === "production";

      res.cookie("authToken", token, {
        httpOnly: true,
        secure: isProduction, // Only secure in production
        sameSite: isProduction ? "none" : "strict", // "None" for cross-origin, "Lax" for local testing
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
      secure: true, // process.env.NODE_ENV === "production", // Matches the secure flag of the cookie
      sameSite: "none", // "strict", // Matches the sameSite flag of the cookie
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

export const searchUserByName = async (req: Request, res: Response) => {
  try {
    const { username } = req.query;
    const users = await User.find({
      username: { $regex: username, $options: "i" },
    }).select("username email");
    res.json({ success: true, users });
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const createAgent = async (req: Request, res: Response) => {
  try {
    const { email, username } = req.body;
    const user = new User({
      email,
      username,
      password: generateSecurePassword(10),
      role: "Agent",
    });
    await user.save();
    res.status(201).json({ success: true, user });
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const getAllInvitations = async (req: Request, res: Response) => {
  try {
    const invitations = await Invitation.find({ email: req.user?.email });
    res.status(200).json({ success: true, data: invitations });
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const acceptInvitation = async (req: Request, res: Response) => {
  try {
    const invitation = await Invitation.findOne({
      _id: req.params.id,
      email: req.user?.email,
      isAccepted: false,
    });
    if (invitation) {
      const user = await User.findOne({ email: req.user?.email });
      if (!user) {
        res.status(404).json({ message: "User not found" });
      } else {
        user.organizations.push({
          organization:
            invitation.organization as unknown as mongoose.Types.ObjectId,
          role: invitation.role as any,
        });
      }
      invitation.isAccepted = true;
      await invitation.save();
      await user?.save();
      res.status(200).json({ message: "Invitation accepted" });
    } else {
      res
        .status(404)
        .json({ message: "Invitation not found or has been accepted" });
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};