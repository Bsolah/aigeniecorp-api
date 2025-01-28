import express from "express";

import {
  createArticle,
  editArticle,
  deleteArticle,
  getArticle,
  getArticleByTag,
  getArticleByCategory,
  searchArticleByTitle,
  addCommentToArticle,
} from "../controllers/articleController";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/create", authMiddleware, createArticle);
router.put("/edit/:id", authMiddleware, editArticle);
router.delete("/delete/:id", authMiddleware, deleteArticle);
router.get("/tag", authMiddleware, getArticleByTag);
router.get("/category", authMiddleware, getArticleByCategory);
router.get("/search/title", authMiddleware, searchArticleByTitle);
router.post("/comment/:id", authMiddleware, addCommentToArticle)
router.get("/:id", authMiddleware, getArticle);

export default router;
