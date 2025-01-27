import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).send('User registered successfully.');
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      res.status(400).send('Invalid email or password.');
    } else {
      const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: '1h' });

      // Set HTTP-only cookie
      res.cookie('authToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Ensure it's secure in production
        sameSite: 'strict', // Prevent CSRF attacks
        maxAge: 3600000, // 1 hour
      });

      res.json({ message: 'Login successful' });
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie('authToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Matches the secure flag of the cookie
      sameSite: 'strict', // Matches the sameSite flag of the cookie
    });
    res.json({ message: 'Logged out successfully' });
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};
