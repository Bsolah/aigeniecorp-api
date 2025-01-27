import { Router } from 'express';
import {
  uploadDocument,
  getDocument,
  shareDocument,
  getDocumentByTag,
  getDocumentByCategory,
  addCommentToDocument,
  addChildToDocument,
} from "../controllers/documentController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.post("/upload", authMiddleware, uploadDocument);
router.get("/tag", authMiddleware, getDocumentByTag);
router.get("/category", authMiddleware, getDocumentByCategory);
router.post("/comment/:id", authMiddleware, addCommentToDocument);
router.post("/child/add/:id", authMiddleware, addChildToDocument);
router.get('/:id', authMiddleware, getDocument);
router.post('/:id/share', authMiddleware, shareDocument);

export default router;
