import { GoogleGenerativeAI } from '@google/generative-ai';
import multer from 'multer';
import dotenv from 'dotenv';
dotenv.config();

const storage = multer.memoryStorage();
const upload = multer({ storage}).single('file');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
export const geminiAI = async (query: string) => {
  const result = await model.generateContent(
    `${query} Give response and then \nGenerate three follow-up questions that are less than 40 characters that the user can ask. it should be in the form r1.response  r1.followUpQuestions`
  );
  return result;
};

export const geminiAIMedia = async (
  buffer: Buffer,
  content: string,
  mimeType: string
) => {
  const result = await model.generateContent([
    `${content} Give response and then \nGenerate three follow-up questions that are less than 40 characters that the user can ask. it should be in the form r1.response  r1.followUpQuestions`,
    { inlineData: { data: buffer.toString("base64"), mimeType } },
  ]);
  return result;
};