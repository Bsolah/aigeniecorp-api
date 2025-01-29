import { Router } from 'express';
import { saveChat, getChatByRoomId, getAllChatByUserId, deleteChatById } from '../controllers/chatController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.post('/save/:chatRoomId',authMiddleware, saveChat);
router.get('/get/:chatRoomId', authMiddleware, getChatByRoomId);
router.get('/get/:userId/rooms', authMiddleware, getAllChatByUserId);
router.delete('/remove/:chatRoomId', authMiddleware, deleteChatById);

export default router;
