import { Request, Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import multer from 'multer';
import dotenv from 'dotenv';
dotenv.config();


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const storage = multer.memoryStorage();
const upload = multer({ storage}).single('file');

export const chatWithAI = async (req: Request, res: Response) => {
  const { query } = req.body;
  try {
    const result = await model.generateContent(`${query} Give response and then \nGenerate three follow-up questions the user can ask. it should be in the form r1.response  r2.followUpQuestions`);
    res.status(200).json({ result: result.response.text() });
  } catch (err) {
    res.status(500).json({ message: 'Error communicating with OpenAI' });
  }
};

export const uploadWithAI = async (req: Request, res: Response) => {

  upload(req, res, async (err: any) => {
    if (err) {
      return res.status(500).json({ message: 'Error uploading file' });
    }

    const file = req.file?.buffer;
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    try {
      const result = await model.generateContent([
        {
            inlineData: {
                data: Buffer.from(file).toString("base64"),
                mimeType: "application/pdf",
            },
        },
        'Summarize this document',
    ]);      
      res.status(200).json({ result: result.response.text() });
    } catch (err) {
      res.status(500).json({ message: 'Error communicating with OpenAI' });
    }
  });
};
