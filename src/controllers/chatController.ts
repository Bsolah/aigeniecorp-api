import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Chat from '../models/Chat';

export const saveChat = async (req: Request, res: Response) => {
  const { content, sender, userId } = req.body;
  const { chatRoomId } = req.params;

  try {
    const chat = new Chat({ content, chatRoomId, sender, userId });
    await chat.save();
    res.status(201).send(`Chat with chatRoomId ${chatRoomId} save successfully.`);
  } catch (err) {
    res.status(500).json({ message: 'Error saving chat chatRoomId ' + err });
  }
};

export const getChatByRoomId = async (req: Request, res: Response) => {

  const { chatRoomId } = req.params;
  const chats = await Chat.find({ chatRoomId }).sort({ timestamp: 1 }); // Sort by timestamp in ascending order

  try {
    res.status(200).json({ chats });
  } catch (err) {
    res.status(500).json({ message: 'Error getting chat from chatRoomId ' + chatRoomId });
  }
};

export const getAllChatByUserId = async (req: Request, res: Response) => {

  const { userId } = req.params;
  try {
    const chatRooms = await Chat.aggregate([
      {
        $match: { userId: new mongoose.Types.ObjectId(userId) } // Find chats for this user
      },
      {
        $sort: { timestamp: 1 } // Sort messages by time
      },
      {
        $group: {
          _id: '$chatRoomId', // Group messages by chatRoomId
          messages: { $push: { sender: '$sender', content: '$content', timestamp: '$timestamp' } }
        }
      },
      {
        $project: {
          chatRoomId: '$_id', // Rename _id to chatRoomId
          messages: 1,
          _id: 0
        }
      }
    ]);

    res.status(200).json({ chatRooms });
  } catch (error) {
    res.status(500).json({ message: 'Error getting chat from user ' + userId });
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
    const chats = await Chat.find({
      "users.user": req.user?.id,
    }).populate("users.user");
    res.status(200).json({
      success: true,
      chats: [
        ...chats.map((chat) => ({
          ...chat.toJSON(),
          users: chat.users.filter((user) => {
            return user.user?._id.toString() !== req.user?.id;
          }),
        })),
      ],
      // ...chats.map((chat) => ({
      //   ...chat.toJSON(),
      //   users: chat.users.filter((user) => {
      //     return user.user?._id.toString() !== req.user?.id;
      //   }),
      // })),
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
        chat: {
          ...findChat?.toJSON(),
          users: findChat?.users.filter((user) => {
            return user.user?._id.toString() !== req.user?.id;
            // return true
          }),
        },
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
          users: chat?.users.filter((user) => {
            // console.log(user?.user?.)
            return user.user?._id.toString() !== req.user?.id;
            // return true
          }),
        },
      });
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const startChatWithBot = async (req: Request, res: Response) => {
  const { chatroomId, bot } = req.body;
  try {
    const chat = await Chat.create({
      chatRoomId: chatroomId,
      users: [{ user: req.user?.id }, { bot }],
    });
    // await chat.save();
    res.status(201).json({
      success: true,
      chat: {
        ...chat?.toJSON(),
        users: chat?.users.filter((user) => {
          return user.user?._id.toString() !== req.user?.id;
        }),
      },
    });
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const addMessageToChat = async (req: Request, res: Response) => {
  const { chatId, bot } = req.body;
  try {
    if (bot) {
      const chat = await Chat.findByIdAndUpdate(
        chatId,
        {
          $push: {
            messages: {
              sender: bot,
              content: req.body.content,
              type: "text",
              timestamp: new Date(),
            },
          },
        },
        { new: true }
      ).populate("users.user");
      res.status(200).json({
        success: true,
        chat: {
          ...chat?.toJSON(),
          users: chat?.users.filter((user) => {
            // console.log(user?.user?.)
            return user.user?._id.toString() !== req.user?.id;
            // return true
          }),
        },
      });
    } else {
      const chat = await Chat.findByIdAndUpdate(
        chatId,
        {
          $push: {
            messages: {
              sender: req.user?.id,
              content: req.body.content,
              type: "text",
              timestamp: new Date(),
            },
          },
        },
        { new: true }
      ).populate("users.user");
      res.status(200).json({
        success: true,
        chat: {
          ...chat?.toJSON(),
          users: chat?.users.filter((user) => {
            // console.log(user?.user?.)
            return user.user?._id.toString() !== req.user?.id;
            // return true
          }),
        },
      });
    }
  } catch (error: any) {
    res.status(500).send(error.message);
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

export const deleteChat = async (req: Request, res: Response) => {
  const { chatId } = req.params;
  try {
    const chat = await Chat.findOneAndDelete({
      _id: chatId,
      "users.user": req.user?.id,
      "users.bot": { $exists: true },
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