import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import Organization from "../models/Organization";
import { generateResetPasswordToken } from "../utils/generateAccessToken";
import generateSecurePassword from "../utils/generateAndHashSocialAuthPassword";
import Invitation from "../models/Invitation";
import mongoose from "mongoose";
import Folder from "../models/Folder";
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'aigeniecorp@gmail.com',
    pass: 'agym orhh tghx hoqt',
  },
});

export const register = async (req: Request, res: Response) => {
  try {
    let orgMap;
    const { username, org, email, password, type, status } = req.body;

    const user = new User({ username, email, password, type, status });
    await user.save();

    // Create organization
    const newOrg = await Organization.create({
      name: `${org} Records`, creator: user?.id,
    });

    console.log("new org ", newOrg)

    // Create organization knowledge base root folder
    await Folder.create({
      name: newOrg.name, createdBy: user?.id, organizationId: newOrg._id
    });

    orgMap = [{
      name: newOrg._id,
      role: "admin"
    }];

    await User.findByIdAndUpdate(
      user._id,
      { organizations: orgMap },
      { new: true },
    );

    res.status(201).send({ message: "Registration successful" });
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).send("Invalid email or password.");
    } else {
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET!,
        { expiresIn: "24h" },
      );

      const isProduction = process.env.NODE_ENV === "production";

      res.cookie("authToken", token, {
        httpOnly: true,
        secure: isProduction ? true : false, // Only secure in production
        sameSite: isProduction ? "none" : "lax", // "None" for cross-origin, "Lax" for local testing
        path: "/",        // Allows the cookie to be sent on all routes
        maxAge: 86400000, // 1 day
      });

      return res.status(200).json({ message: "Login successful", user: user });
    }
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
};

export const checkAuth = async (req: Request, res: Response): Promise<any> => {
  try {
    const token = req.cookies.authToken;
    if (!token) { return res.status(401).json({ message: "Not authenticated" }); }

    jwt.verify(token, process.env.JWT_SECRET!, (err: any, decoded: any) => {
      if (err) { return res.status(401).json({ message: "Invalid token" }); }
      return res.json({ user: decoded });
    });
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
}

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("authToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Matches the secure flag of the cookie
      sameSite: "none", // "strict", // Matches the sameSite flag of the cookie
      expires: new Date(0),
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

export const acceptInvitation = async (req: Request, res: Response): Promise<any> => {
  const { token, username, password } = req.body;

  try {
    const invite = await Invitation.findOne({ token, expiresAt: { $gt: new Date() } });
    if (!invite) {
      return res.status(400).json({ error: 'Invalid or expired invite.' });
    }

    // const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ email: invite.email, username, password });

    await Invitation.deleteOne({ _id: invite._id });

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to accept invite.' });
  }
};

export const sendInvitation = async (req: Request, res: Response): Promise<any> => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already invited' });
    }

    // Save to DB
    // const newUser = new User({ email });
    // await newUser.save();

    // Send invite email
    const mailOptions = {
      from: 'aigeniecorp@gmail.com',
      to: email,
      subject: 'You are invited to AI Genie Organization',
      text: `You have been invited to join AI Genie. Click the link to accept the invitation.`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Invitation sent successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};