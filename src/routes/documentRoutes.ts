import { Router } from 'express';
import { uploadDocument } from '../controllers/documentController';

const router = Router();

router.post('/upload', uploadDocument);

export default router;
