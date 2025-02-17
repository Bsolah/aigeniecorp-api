import { Request, Response } from "express";
import mongoose from "mongoose";
import Chat from "../models/Chat";
import User from "../models/User";
import {
  convertToStructuredObject,
} from "../utils/commonFunctions";
import { geminiAI, geminiAIMedia, openAiChat, deepSeekChat } from "../utils/aiModels";
import { uploadFile } from "../utils/s3utils";

export const postChat = async (req: Request, res: Response) => {
  const { content, receiverId, chatRoomId, type, internalAI, externalAI } = req.body;
  const { senderId } = req.params;
  const switchAI  = JSON.parse(externalAI);


  let attachmentUrl;
  const file = req.file;
  if (file && file?.mimetype) {
    attachmentUrl = await uploadFile(file);
  }

  try {
    const chat = new Chat({ content, chatRoomId, senderId, receiverId, type });
    await chat.save();

    const user = await User.findById(receiverId);
    if (!user) {
      res.status(404).json({ error: `User not found by id ${receiverId}` });
    }

    // Check if the recipient user is a Bot
    if (user?.role === "Agent") {

      let aiResponse = content;
      if (file && file?.mimetype) {
        aiResponse = await geminiAIMedia(
          file.buffer,
          content,
          file.mimetype,
        );
      } else {

        console.log('ai ', switchAI);
        console.log('ai ', switchAI['dai']);
        console.log('ai 2 ', switchAI.gai);
        console.log('ai 3 ', switchAI.oai);

        if(switchAI['gai']) {
          aiResponse = await geminiAI(content);
        } 
        if (switchAI['oai']) {
          aiResponse = geminiAI(content) // openAiChat(content);
        }
        if (switchAI['dai']) {
          aiResponse = geminiAI(content) // deepSeekChat(content);
        }
      }

      const convertedResponse = convertToStructuredObject(
        aiResponse.response.text(), internalAI, externalAI, content
      );;

      const newChat = {
        content: convertedResponse.response,
        prompts: convertedResponse.prompts,
        chatRoomId: chatRoomId,
        senderId: receiverId,
        receiverId: senderId,
        attachments: attachmentUrl,
        type: 'text',
      };
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
  // Sort by timestamp in ascending order
  const { page } = req.query;
  const skip = page ? parseInt(page.toString()) * 50 : 0;

  // Sort by timestamp in ascending order
  try {
    if (page) {
      const chats = await Chat.find({ chatRoomId })
        .sort({ timestamp: 1 })
        .populate("senderId receiverId", "username email id image role")
        .skip(skip)
        .limit(50);
      res.status(200).json({ chats });
    } else {
      const chats = await Chat.find({ chatRoomId })
        .populate("senderId receiverId", "username email id image role")
        .sort({ timestamp: 1 });

      // const response =   groupMessagesByConversation(chats, req?.user?.id);
      res.status(200).json(chats);
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error getting chat from chatRoomId " + chatRoomId, err });
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
          role: { $first: "$otherUser.role" },
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
          role: 1,
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
