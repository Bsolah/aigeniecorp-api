import { Router } from "express";
import { chatWithAI, uploadWithAI, askWithAI } from "../controllers/aiController";
import authMiddleware from "../middlewares/authMiddleware";
import multer from "multer";

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 1 * 1024 * 1024 },
});

router.post("/chat", authMiddleware,  chatWithAI);
router.post("/ask", authMiddleware, upload.single('media'), askWithAI);
router.post("/upload", authMiddleware, uploadWithAI);

export default router;
