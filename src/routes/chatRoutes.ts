import { Router } from 'express';
import {
  saveChat,
  getChatByRoomId,
  getAllChatByUserId,
  deleteChatById,
  getAllUserChat,
  startChatWithUser,
  startChatWithBot,
  addMessageToChat,
  getChatById,
  deleteChat,
} from "../controllers/chatController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.post("/save/:senderId", authMiddleware, saveChat);
router.get("/get/:chatRoomId", authMiddleware, getChatByRoomId);
router.get("/get/:userId/rooms", authMiddleware, getAllChatByUserId);
router.delete("/remove/:chatRoomId", authMiddleware, deleteChatById);
router.get("/all", authMiddleware, getAllUserChat);
router.post("/start/user", authMiddleware, startChatWithUser);
router.post("/start/bot", authMiddleware, startChatWithBot);
router.post("/message", authMiddleware, addMessageToChat);
router.get("/details/:id", authMiddleware, getChatById);
router.delete("/delete/bot/chat/:chatId", authMiddleware, deleteChat);

export default router;
