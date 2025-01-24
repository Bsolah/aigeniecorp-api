import { Router } from 'express';
import { chatWithAI } from '../controllers/chatController';

const router = Router();

console.log('I am here')
router.post('/ask', chatWithAI);

export default router;
