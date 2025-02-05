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

const deepSeekClient = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: "sk-",
});

export const geminiAI = async (query: string) => {
  const result = await model.generateContent(
    `${query} Give response and then \nGenerate three follow-up questions that are less than 40 characters that the user can ask. it should be in the form r1.response  r1.followUpQuestions`,
  );
  return result;
};

export const geminiAIMedia = async (
  buffer: Buffer,
  content: string,
  mimeType: string,
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
  try {
    const file = await openAiClient.files.create({
      file: await toFile(Readable.from(buffer), name),
      purpose: "assistants",
    });
    console.log(file.id);

    const assistant = await openAiClient.beta.assistants.create({
      name: "File Processor",
      instructions: "You analyze and summarize the uploaded document.",
      tools: [{ type: "code_interpreter" }], // Add tools as needed
      model: "gpt-4-turbo",
    });

    const thread = await openAiClient.beta.threads.create();

    // Send message with file reference
    const message = await openAiClient.beta.threads.messages.create(thread.id, {
      role: "user",
      content: `${content} Give response and then \nGenerate three follow-up questions that are less than 40 characters that the user can ask. it should be in the form r1.response  r1.followUpQuestions`,
      attachments: [{ file_id: file.id }],
    });

    console.log("Message Sent:", message.id);

    // Run the assistant to process the message
    const run = await openAiClient.beta.threads.runs.create(thread.id, {
      assistant_id: assistant.id,
    });

    console.log("Run Started:", run.id);

    // Wait for completion (polling)
    let response;
    while (true) {
      const runStatus = await openAiClient.beta.threads.runs.retrieve(
        thread.id,
        run.id
      );
      if (runStatus.status === "completed") {
        response = await openAiClient.beta.threads.messages.list(thread.id);
        break;
      }
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait 2 sec
    }

    return response.data[0].content[0];

    // const response = await openAiClient.chat.completions.create({
    //   model: "gpt-4-turbo",
    //   messages: [
    //     { role: "system", content: "You are an AI that processes files." },
    //     {
    //       role: "user",
    //       content: `${content}  Give response and then \nGenerate three follow-up questions that are less than 40 characters that the user can ask. it should be in the form r1.response  r1.followUpQuestions`,
    //     },
    //   ],
    //   file_ids: [file.id],
    // });
  } catch (error) {
    console.error(error);
  }
};

const deepSeekChat = async (query: string) => {
  const result = await deepSeekClient.chat.completions.create({
    model: "deepseek-chat",
    messages: [
      {
        role: "system",
        content: `${query} Give response and then \nGenerate three follow-up questions that are less than 40 characters that the user can ask. it should be in the form r1.response  r1.followUpQuestions`,
      },
    ],
  });
  return result.choices[0].message.content;
};

const deepSeekMedia = async (
  name: string,
  buffer: Buffer,
  content: string,
  mimeType: string
) => {
  try {
    const response = await deepSeekClient.files;
  } catch (error) {
    console.error(error);
  }
};
