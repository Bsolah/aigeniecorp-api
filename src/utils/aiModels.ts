import { GoogleGenerativeAI } from '@google/generative-ai';
import multer from 'multer';
import OpenAI, { toFile } from "openai";
import { Readable } from "stream";
import dotenv from "dotenv";
dotenv.config();

const storage = multer.memoryStorage();
const upload = multer({ storage }).single("file");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const openAiClient = new OpenAI({
  organization: process.env.OPENAI_ORG as string,
  project: process.env.OPENAI_PROJECT as string,
  apiKey: process.env.OPENAI_API_KEY as string,
});

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

const openAiChat = async (query: string) => {
  const result = await openAiClient.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `${query} Give response and then \nGenerate three follow-up questions that are less than 40 characters that the user can ask. it should be in the form r1.response  r1.followUpQuestions`,
      },
    ],
  });
  return result.choices[0].message.content;
};

const openAiMedia = async (
  name: string,
  buffer: Buffer,
  content: string,
  mimeType: string
) => {
  // const result = await openAiClient.files.create({
  //   purpose: "chat",
  //   file: buffer,
  //   model: "gpt-3.5-turbo",
  //   messages: [
  //     {
  //       role: "system",
  //       content: `${content} Give response and then \nGenerate three follow-up questions that are less than 40 characters that the user can ask. it should be in the form r1.response  r1.followUpQuestions`,
  //     },
  //   ],
  // });
  // return result.choices[0].message.content;
  const file = await openAiClient.files.create({
    file: await toFile(Readable.from(buffer), name),
    purpose: "assistants",
  });

  const response = await openAiClient.chat.completions.create({
    model: "gpt-4-turbo",
    messages: [
      { role: "system", content: "You are an AI that processes files." },
      {
        role: "user",
        content: `${content}  Give response and then \nGenerate three follow-up questions that are less than 40 characters that the user can ask. it should be in the form r1.response  r1.followUpQuestions`,
      },
    ],
    file_ids: [file.id],
  });
};