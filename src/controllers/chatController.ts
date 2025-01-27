import { Request, Response } from 'express';
import Chat from '../models/Chat';

export const saveChat = async (req: Request, res: Response) => {
  const { content, sender, user } = req.body;
  const { room } = req.params;

  try {
    const chat = new Chat({ content, room, sender, user });
    await chat.save();
    res.status(201).send(`Chat with room ${room} save successfully.`);
  } catch (err) {
    res.status(500).json({ message: 'Error saving chat room ' + err });
  }
};

export const getChatById = async (req: Request, res: Response) => {

  const { room } = req.params;
  const chats = await Chat.find({ room }).sort({ timestamp: 1 }); // Sort by timestamp in ascending order

  try {
    res.status(200).json({ chats });
  } catch (err) {
    res.status(500).json({ message: 'Error getting chat from room ' + room });
  }
};


export const deleteChatById = async (req: Request, res: Response) => {

  const { room } = req.params;
  await Chat.deleteMany({ room });

  try {
    res.status(200).json({ message: `Chat from room ${room} deleted successfully.` });
  } catch (err) {
    res.status(500).json({ message: 'Error communicating with OpenAI' });
  }
};