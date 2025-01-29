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
    res.status(200).json({ message: `Chat from chatRoomId ${chatRoomId} deleted successfully.` });
  } catch (err) {
    res.status(500).json({ message: 'Error communicating with OpenAI' });
  }
};