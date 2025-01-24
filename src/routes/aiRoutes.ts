import { Router } from 'express';
import { chatWithAI, uploadWithAI } from '../controllers/aiController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.post('/ask', authMiddleware, chatWithAI);
router.post('/upload', authMiddleware, uploadWithAI);

export default router;
