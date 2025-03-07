import { Request, Response } from "express";
import mongoose from "mongoose";
import Chat from "../models/Chat";
import User from "../models/User";
import {
  convertToStructuredObject,
  hasDataLeak,
} from "../utils/commonFunctions";
import { geminiAI, geminiAIMedia, openAiChat, deepSeekChat, openAiMedia } from "../utils/aiModels";
import { uploadFile, getSignedUrl } from "../utils/s3utils";

export const postChat = async (req: Request, res: Response): Promise<any> => {
  const { content, receiverId, chatRoomId, type, externalAI } = req.body;
  const { senderId } = req.params;

  console.log('externalAI ', externalAI)

  if (!externalAI) {
    return res.status(500).json({ message: "Select an AI Model " });
  }
  const switchAI = JSON.parse(externalAI);


  let attachmentUrl;
  const file = req.file;
  if (file && file?.mimetype) {
    attachmentUrl = await uploadFile(file);
  }

  try {
    const chat = new Chat({ content, chatRoomId, senderId, attachments: attachmentUrl, receiverId, type });
    await chat.save();

    const user = await User.findById(receiverId);
    if (!user) {
      return res.status(404).json({ error: `User not found by id ${receiverId}` });
    }

    if (hasDataLeak(content)) {

      const newChat = {
        content: "Your request contains **sensitive** information and cannot be processed",
        prompts: [],
        chatRoomId: chatRoomId,
        senderId: receiverId,
        receiverId: senderId,
        type: 'text',
      };
      const chat = new Chat(newChat);

      await chat.save();
      return res
        .status(201)
        .send(`Chat with chatRoomId ${chatRoomId} save successfully.`);
    }

    // Check if the recipient user is a Bot
    if (user?.type === "Agent") {

      let aiResponse = content;
      if (file && file?.mimetype) {
        if (switchAI['gai']) {
          aiResponse = await geminiAIMedia(
            file.buffer,
            content,
            file.mimetype,
          );
          aiResponse = aiResponse.response.text()
        } else {
          aiResponse = await openAiMedia(
            file?.originalname,
            file.buffer,
            content,
          );
        }
      } else {

        if (switchAI['gai']) {
          aiResponse = await geminiAI(content);
          aiResponse = aiResponse.response.text();
        }
        if (switchAI['oai']) {
          aiResponse = await openAiChat(content);
        }
        if (switchAI['dai']) {
          aiResponse = await openAiChat(content); //geminiAI(content) // deepSeekChat(content);
        }
      }

      if (!switchAI['gai'] && !switchAI['oai'] && !switchAI['dai'] && !switchAI['knb']) {
        aiResponse = "**Kindly Select an AI Model** before the chat can be processed";
      }

      console.log('ai res ', aiResponse)

      const convertedResponse = convertToStructuredObject(
        aiResponse, content, switchAI
      );;
      aiResponse = null

      const newChat = {
        content: convertedResponse, // convertedResponse?.response,
        prompts: [], // convertedResponse?.prompts,
        chatRoomId: chatRoomId,
        senderId: receiverId,
        receiverId: senderId,
        type: 'text',
      };

      console.log('new chats ', newChat)
      const chat = new Chat(newChat);

      await chat.save();
    }

    res
      .status(201)
      .send(`Chat with chatRoomId ${chatRoomId} save successfully.`);
  } catch (err) {
    res.status(500).json({ message: "Error saving chat chatRoomId " + err });
  }
};

export const getChatByRoomId = async (req: Request, res: Response) => {

  const { chatRoomId } = req.params;
  const { page }: any = req.query;
  const skip = page ? parseInt(page.toString()) * 50 : 0;

  try {
    let chats = await Chat.find({ chatRoomId })
      .populate("senderId receiverId", "username email id image type")
      .sort({ timestamp: 1 }) // Ensure ascending order by timestamp
      .skip(skip)
      .limit(page && 50);

    // Process attachments without breaking the order
    chats = await Promise.all(
      chats.map(async (chat: any) => {
        if (!chat.attachments) return chat; // Skip if no attachments

        try {
          const url = new URL(chat.attachments);
          const parts = url.pathname.split("/");
          const bucketName = parts[1];
          const fileName = decodeURIComponent(parts.slice(2).join("/"));

          if (bucketName && fileName) {
            chat.attachments = await getSignedUrl(fileName, bucketName);
          }
        } catch (error) {
          console.error("Error generating signed URL: ", error);
        }
        return chat;
      })
    );

    // Final sort after processing to preserve order
    chats.sort((a: any, b: any) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

    res.status(200).json(chats);
  } catch (err) {
    res.status(500).json({ message: `Error getting chats for chatRoomId ${chatRoomId}`, err });
  }

};

export const getAllChatByUserId = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  try {


    const chatRooms = await Chat.aggregate([
      {
        $match: {
          $or: [
            { senderId: new mongoose.Types.ObjectId(userId) },
            { receiverId: new mongoose.Types.ObjectId(userId) }
          ]
        }
      },
      {
        $sort: { createdAt: -1 } // Sort messages by createdAt in descending order
      },

      {
        $lookup: {
          from: "users", // Join with users collection to get sender details
          localField: "senderId",
          foreignField: "_id",
          as: "sender"
        }
      },
      {
        $lookup: {
          from: "users", // Join with users collection to get receiver details
          localField: "receiverId",
          foreignField: "_id",
          as: "receiver"
        }
      },
      {
        $unwind: "$sender" // Unwind the sender details
      },
      {
        $unwind: "$receiver" // Unwind the receiver details
      },
      {
        $addFields: {
          otherUser: {
            $cond: {
              if: { $eq: ["$sender._id", new mongoose.Types.ObjectId(userId)] },
              then: "$receiver",
              else: "$sender"
            }
          }
        }
      },
      {
        $group: {
          _id: "$chatRoomId", // Group by chatRoomId
          lastMessageContent: { $first: "$content" },
          lastMessageType: { $first: "$type" },
          lastMessageDate: { $first: "$createdAt" },
          status: { $first: "online" }, // You can change this logic for actual status
          name: { $first: "$otherUser.username" },
          type: { $first: "$otherUser.type" },
          userId: { $first: "$otherUser._id" }
        }
      },
      {
        $project: {
          id: "$_id", // Rename _id to chatRoomId
          lastMessageContent: 1,
          lastMessageType: 1,
          lastMessageDate: 1,
          status: 1, // You can change this logic for actual status
          name: 1,
          type: 1,
          userId: 1,
          _id: 0
        }
      }
    ]);

    res.status(200).json(chatRooms);
  } catch (error) {
    console.log({ error })
    res.status(500).json({ message: "Error getting chat from user " + userId });
  }
};

export const deleteChatById = async (req: Request, res: Response) => {
  const { chatRoomId } = req.params;
  await Chat.deleteMany({ chatRoomId });

  try {
    res.status(200).json({
      message: `Chat from chatRoomId ${chatRoomId} deleted successfully.`,
    });
  } catch (err) {
    res.status(500).json({ message: "Error communicating with OpenAI" });
  }
};

export const getChatById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const chat = await Chat.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
          "users.user": new mongoose.Types.ObjectId(req.user?.id),
        },
      },
      {
        $project: {
          chatRoomId: 1,
          messages: 1,
          users: {
            $filter: {
              input: "$users",
              as: "user",
              cond: {
                $ne: ["$$user.user", new mongoose.Types.ObjectId(req.user?.id)],
              }, // Keep only delivered orders
            },
          },
        },
      },
      {
        $lookup: {
          from: "users", // Collection to join
          localField: "users.user", // Field in 'users'
          foreignField: "_id", // Matching field in 'orders'
          as: "users", // Output array name
        },
      },
    ]);
    res.status(200).json({ success: true, chat: chat[0] });
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const deleteChatByChatroonId = async (req: Request, res: Response) => {
  const { chatId } = req.params;
  try {
    const chat = await Chat.deleteMany({
      chatRoomId: chatId,
      // $or: [{ senderId: req.user?.id }, { receiverId: req.user?.id }],
    });
    if (!chat) {
      res.status(404).json({ message: "Chat not found" });
    } else {
      res.status(200).json({ success: true, chat });
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};
