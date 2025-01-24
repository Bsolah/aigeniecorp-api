import { Request, Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const chatWithAI = async (req: Request, res: Response) => {
  const { prompt } = req.body;

  try {
    const response = await model.generateContent(prompt);
    res.status(200).json({ result: response.response.text() });
  } catch (err) {
    res.status(500).json({ message: 'Error communicating with OpenAI' });
  }
};
