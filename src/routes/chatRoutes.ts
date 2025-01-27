import { Router } from 'express';
import { saveChat, getChatById, deleteChatById } from '../controllers/chatController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.post('/save/:room', authMiddleware, saveChat);
router.get('/get/:room', authMiddleware, getChatById);
router.delete('/remove/:room', authMiddleware, deleteChatById);

export default router;
