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

router.post("/save/:senderId",  upload.single("media"), postChat);
router.get("/get/rooms", getAllChatByUserId);
router.get("/get/:chatRoomId", getChatByRoomId);
router.delete("/remove/:chatRoomId", deleteChatById);
router.get("/details/:id", getChatById);
router.delete("/delete/:chatId", deleteChatByChatroonId);

export default router;
