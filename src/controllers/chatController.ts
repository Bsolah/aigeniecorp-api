import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Chat from "../models/Chat";
import User from "../models/User";
import {
  processChats,
  groupMessagesByConversation,
  convertToStructuredObject,
} from "../utils/commonFunctions";
import { chatWithAI } from "./aiController";
import { geminiAI, geminiAIMedia } from "../utils/aiModels";
import { uploadFile } from "../utils/s3utils";

export const saveChat = async (req: Request, res: Response) => {
  const { content, receiverId, chatRoomId, type } = req.body;
  const { senderId } = req.params;

  console.log("requests body ", req.body);
  console.log("requests params ", req.params);

  try {
    const chat = new Chat({ content, chatRoomId, senderId, receiverId, type });
    await chat.save();

    const user = await User.findById(receiverId);
    if (!user) {
      res.status(404).json({ error: `User not found by id ${receiverId}` });
    }

    // Check if the user has the role 'Agent'
    if (user?.role === "Agent") {
      const aiResponse = await geminiAI(content);
      const convertedResponse = convertToStructuredObject(
        aiResponse.response.text(),
      );
      const newChat = {
        content: convertedResponse.response,
        prompts: convertedResponse.prompts,
        chatRoomId: null,
        senderId: receiverId,
        receiverId: senderId,
        type,
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

export const saveChatWithMedia: (
  req: Request,
  res: Response,
  next: NextFunction,
) => void = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { content, receiverId, chatRoomId, type } = req.body;
    const { senderId } = req.params;
    const file = req.file;
    const url = await uploadFile(file);
    if (
      file?.mimetype.startsWith("image") ||
      file?.mimetype.startsWith("audio") ||
      file?.mimetype.startsWith("application")
    ) {
      console.log("File is an image / or audio / or application");
      const user = await User.findById(receiverId);
      if (!user) {
        res.status(404).json({ error: `User not found by id ${receiverId}` });
      }
      // Check if the user has the role 'Agent'
      if (user?.role === "Agent") {
        const aiResponse = await geminiAIMedia(
          file.buffer,
          content,
          file.mimetype,
        );
        const convertedResponse = convertToStructuredObject(
          aiResponse.response.text(),
        );
        console.log("convertedResponse ", convertedResponse);
        const newChat = {
          content: convertedResponse.response,
          prompts: convertedResponse.prompts,
          chatRoomId: null,
          senderId: receiverId,
          receiverId: senderId,
          type,
          attachments: url,
        };
        const chat = new Chat(newChat);

        await chat.save();
      } else {
        const chat = new Chat({
          content,
          chatRoomId,
          senderId,
          receiverId,
          type,
          attachments: url,
        });
        await chat.save();
      }
      res
        .status(201)
        .send(`Chat with chatRoomId ${chatRoomId} save successfully.`);
    } else {
      return res.status(400).json({ message: "File type not supported" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error saving chat chatRoomId " + err });
  }
};

export const getChatByRoomId = async (req: Request, res: Response) => {
  const { chatRoomId } = req.params;
  const { page } = req.query;
  const skip = page ? parseInt(page.toString()) * 50 : 0;

  // Sort by timestamp in ascending order

  try {
    if (page) {
      const chats = await Chat.find({ chatRoomId })
        .sort({ timestamp: 1 })
        .skip(skip)
        .limit(50);
      res.status(200).json({ chats });
    }
    if (page) {
      const chats = await Chat.find({ chatRoomId })
        .sort({ timestamp: 1 })
        .skip(skip)
        .limit(50);
    } else {
      const chats = await Chat.find({ chatRoomId }).sort({ timestamp: 1 });
      res.status(200).json({ chats });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error getting chat from chatRoomId " + chatRoomId });
  }
};

export const getAllChatByUserId = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const chatRooms = await Chat.aggregate([
      {
        $match: { userId: new mongoose.Types.ObjectId(userId) }, // Find chats for this user
      },
      {
        $sort: { timestamp: 1 }, // Sort messages by time
      },
      {
        $group: {
          _id: "$chatRoomId", // Group messages by chatRoomId
          messages: {
            $push: {
              sender: "$sender",
              content: "$content",
              timestamp: "$timestamp",
            },
          },
        },
      },
      {
        $project: {
          chatRoomId: "$_id", // Rename _id to chatRoomId
          messages: 1,
          _id: 0,
        },
      },
    ]);

    res.status(200).json({ chatRooms });
  } catch (error) {
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

export const getAllUserChat = async (req: Request, res: Response) => {
  try {
    // const chats = await Chat.find({
    //   users: { $elemMatch: { user: req.params.userId } },
    // });
    // const chats = await Chat.find({
    //   "users.user": req.user?.id,
    // }).populate("users.user");

    // const chatsResponse = processChats(chats);

    // Extract user information from the users array
    //  const user = chats.users.find(user => user.user && user.user.username && user.user.email);

    // console.log()
    // res.status(200).json({
    //   status: true,
    //   chats: chatsResponse

    // chats: [
    //   ...chats.map((chat) => ({
    //     ...chat.toJSON(),
    //     // ...chat.users.filter(async (user) => {
    //     //   const userId = user.user?._id.toString() !== req.user?.id;
    //     //   const userItems = await User.findById(userId);
    //     //   return userItems;
    //     // }),
    //   })),
    // ],

    console.log("user ", req.user);

    const messages = await Chat.find({
      $or: [
        { senderId: req.user?.id }, // Find messages where you're the sender
        { receiverId: req.user?.id }, // Find messages where you're the receiver
      ],
    })
      .populate("senderId receiverId", "username email id image role") // Optionally populate user details
      .exec();
    const chats = groupMessagesByConversation(messages, req.user?.id);
    const modifiedChatForBasicMessge = [
      ...chats.map((chat: any) => {
        return {
          ...chat,
          messages: chat.messages[chat.messages.length - 1],
        };
      }),
    ];
    res.status(200).json({
      status: true,
      chats: modifiedChatForBasicMessge,
    });
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};



export const startChatWithUser = async (req: Request, res: Response) => {
  const { userId } = req.body;
  try {
    const findChat = await Chat.findOne({
      // users: {
      //   $and: [{ user: req.user?.id }, { user: userId }],
      // },
      $and: [{ "users.user": req.user?.id }, { "users.user": userId }],
    }).populate("users.user");
    if (findChat) {
      res.status(200).json({
        success: true,
        // chat: {
        //   ...findChat?.toJSON(),
        //   users: findChat?.users.filter((user) => {
        //     return user.user?._id.toString() !== req.user?.id;
        //     // return true
        //   }),
        // },
      });
    } else {
      const chat = await Chat.create({
        users: [{ user: req.user?.id }, { user: userId }],
      });
      await chat.populate("users.user");
      res.status(201).json({
        success: true,
        chat: {
          ...chat?.toJSON(),
          // users: chat?.users.filter((user) => {
          //   // console.log(user?.user?.)
          //   return user.user?._id.toString() !== req.user?.id;
          //   // return true
          // }),
        },
      });
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const startChatWithBot = async (req: Request, res: Response) => {
  // const { chatroomId, bot } = req.body;
  // try {
  //   const chat = await Chat.create({
  //     chatRoomId: chatroomId,
  //     users: [{ user: req.user?.id }, { bot }],
  //   });
  //   // await chat.save();
  //   res.status(201).json({
  //     success: true,
  //     chat: {
  //       ...chat?.toJSON(),
  //       users: chat?.users.filter((user) => {
  //         return user.user?._id.toString() !== req.user?.id;
  //       }),
  //     },
  //   });
  // } catch (error: any) {
  //   res.status(500).send(error.message);
  // }
};

export const addMessageToChat = async (req: Request, res: Response) => {
  // const { chatId, bot } = req.body;
  // try {
  //   if (bot) {
  //     const chat = await Chat.findByIdAndUpdate(
  //       chatId,
  //       {
  //         $push: {
  //           messages: {
  //             sender: bot,
  //             content: req.body.content,
  //             type: "text",
  //             timestamp: new Date(),
  //           },
  //         },
  //       },
  //       { new: true }
  //     ).populate("users.user");
  //     res.status(200).json({
  //       success: true,
  //       chat: {
  //         ...chat?.toJSON(),
  //         users: chat?.users.filter((user) => {
  //           // console.log(user?.user?.)
  //           return user.user?._id.toString() !== req.user?.id;
  //           // return true
  //         }),
  //       },
  //     });
  //   } else {
  //     const chat = await Chat.findByIdAndUpdate(
  //       chatId,
  //       {
  //         $push: {
  //           messages: {
  //             sender: req.user?.id,
  //             content: req.body.content,
  //             type: "text",
  //             timestamp: new Date(),
  //           },
  //         },
  //       },
  //       { new: true }
  //     ).populate("users.user");
  //     res.status(200).json({
  //       success: true,
  //       chat: {
  //         ...chat?.toJSON(),
  //         users: chat?.users.filter((user) => {
  //           // console.log(user?.user?.)
  //           return user.user?._id.toString() !== req.user?.id;
  //           // return true
  //         }),
  //       },
  //     });
  //   }
  // } catch (error: any) {
  //   res.status(500).send(error.message);
  // }
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
    const chat = await Chat.findOneAndDelete({
      chatRoomId: chatId,
      $or: [{ senderId: req.user?.id }, { receiverId: req.user?.id }],
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
