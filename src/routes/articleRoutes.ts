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
  addUserToArticleTeam,
  getUserDraftArticles,
  publishArticle,
} from "../controllers/articleController";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/create", authMiddleware, createArticle);
router.put("/edit/:id", authMiddleware, editArticle);
router.delete("/delete/:id", authMiddleware, deleteArticle);
router.get("/tag", authMiddleware, getArticleByTag);
router.get("/category", authMiddleware, getArticleByCategory);
router.get("/search/title", authMiddleware, searchArticleByTitle);
router.get("/drafts", authMiddleware, getUserDraftArticles);
router.post("/comment/:id", authMiddleware, addCommentToArticle);
router.post("/add/user/:id", authMiddleware, addUserToArticleTeam);
router.get("/:id", authMiddleware, getArticle);
router.post("/publish/:id", authMiddleware, publishArticle);
export default router;
