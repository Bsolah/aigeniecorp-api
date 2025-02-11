import { Router } from "express";
import {
  postChat,
  getChatByRoomId,
  getAllChatByUserId,
  deleteChatById,
  // getAllUserChat,
  // startChatWithUser,
  // startChatWithBot,
  // addMessageToChat,
  getChatById,
  deleteChatByChatroonId,
  // saveChatWithMedia,
} from "../controllers/chatController";
import authMiddleware from "../middlewares/authMiddleware";
import multer from "multer";

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 1 * 1024 * 1024 },
});

router.post("/save/:senderId", authMiddleware,  upload.single("media"), postChat);
router.get("/get/rooms", authMiddleware, getAllChatByUserId);
router.get("/get/:chatRoomId", authMiddleware, getChatByRoomId);
router.delete("/remove/:chatRoomId", authMiddleware, deleteChatById);
router.get("/details/:id", authMiddleware, getChatById);
router.delete("/delete/:chatId", authMiddleware, deleteChatByChatroonId);

export default router;
