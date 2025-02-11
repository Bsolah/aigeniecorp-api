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
  getAllArticles,
  publishArticle,
} from "../controllers/articleController";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/create", createArticle);
router.put("/edit/:id", editArticle);
router.delete("/delete/:id", deleteArticle);
router.get("/tag", getArticleByTag);
router.get("/category", getArticleByCategory);
router.get("/search/title", searchArticleByTitle);
router.get("/all", getAllArticles);
router.post("/comment/:id", addCommentToArticle);
router.post("/add/user/:id", addUserToArticleTeam);
router.get("/:id", getArticle);
router.post("/publish/:id", publishArticle);
export default router;
