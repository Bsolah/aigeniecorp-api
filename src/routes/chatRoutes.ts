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
  deleteChatByChatroonId,
  saveChatWithMedia,
} from "../controllers/chatController";
import authMiddleware from "../middlewares/authMiddleware";
import multer from "multer";

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 1 * 1024 * 1024 },
});

router.post("/save/:senderId", authMiddleware, saveChat);
router.post(
  "/save/media/:senderId",
  authMiddleware,
  upload.single("media"),
  saveChatWithMedia
);
router.get("/get/:chatRoomId", authMiddleware, getChatByRoomId);
router.get("/get/:userId/rooms", authMiddleware, getAllChatByUserId);
router.delete("/remove/:chatRoomId", authMiddleware, deleteChatById);
router.get("/all", authMiddleware, getAllUserChat);
router.post("/start/user", authMiddleware, startChatWithUser);
router.post("/start/bot", authMiddleware, startChatWithBot);
router.post("/message", authMiddleware, addMessageToChat);
router.get("/details/:id", authMiddleware, getChatById);
router.delete("/delete/:chatId", authMiddleware, deleteChatByChatroonId);

export default router;
