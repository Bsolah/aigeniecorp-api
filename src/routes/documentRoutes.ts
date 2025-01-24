import { Router } from 'express';
import { uploadDocument, getDocument, shareDocument } from '../controllers/documentController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.post('/upload', authMiddleware, uploadDocument);
router.get('/:id', authMiddleware, getDocument);
router.post('/:id/share', authMiddleware, shareDocument);

export default router;
