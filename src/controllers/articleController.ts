import { Request, Response, NextFunction } from "express";
import Article from "../models/Article";
import mongoose from "mongoose";
import Folder from "../models/Folder";

export const createArticle = async (req: Request, res: Response) => {
  try {
    const { title, content, tags, categories, parent, type } = req.body;
    const parentFolder = await Folder.findById(parent);
    const article = await Article.create({
      title,
      content,
      createdBy: req.user?.id,
      tags,
      categories,
      parent,
      type,
    });
    parentFolder?.articles.push(article._id as any);
    await parentFolder?.save();
    res.status(201).json({
      success: true,
      message: "Article created successfully",
      article,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

export const editArticle = async (req: Request, res: Response) => {
  try {
    const { title, content, tags, categories, parent, child } = req.body;
    const findAccessToArticle = await Article.findOne({
      _id: req.params.id,
      $or: [
        { createdBy: req.user?.id },
        {
          $or: [
            {
              $and: [
                { "teamAccess.user": req.user?.id },
                { "teamAccess.role": "admin" },
              ],
            },
            {
              $and: [
                { "teamAccess.user": req.user?.id },
                { "teamAccess.role": "editor" },
              ],
            },
          ],
        },
      ],
    });
    if (!findAccessToArticle) {
      res
        .status(404)
        .json({ error: "Article not found or you don't have access" });
    } else {
      const article = await Article.findByIdAndUpdate(
        req.params.id,
        { title, content, tags, categories, parent, child },
        { new: true },
      );
      res.status(200).json({
        success: true,
        message: "Article updated successfully",
        article,
      });
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const publishArticle = async (req: Request, res: Response) => {
  try {
    const articleId = req.params.id;
    const { access } = req.body;
    const findAccessToArticle = await Article.findOne({
      _id: articleId,
      $or: [
        { createdBy: req.user?.id },
        {
          $and: [
            { "teamAccess.user": req.user?.id },
            { "teamAccess.role": "admin" },
          ],
        },
      ],
    });
    if (!findAccessToArticle) {
      res
        .status(404)
        .json({ error: "Article not found or you don't have access" });
    } else {
      const article = await Article.findByIdAndUpdate(
        articleId,
        { access },
        { new: true },
      );
      res.status(200).json({
        success: true,
        message: `Article is now ${access}`,
        article,
      });
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const deleteArticle = async (req: Request, res: Response) => {
  try {
    const article = await Article.findOneAndDelete({
      _id: req.params.id,
      $or: [
        { createdBy: req.user?.id },
        {
          $and: [
            { "teamAccess.user": req.user?.id },
            { "teamAccess.role": "admin" },
          ],
        },
      ],
    });
    if (!article) {
      res
        .status(404)
        .json({ error: "Article not found or you don't have access" });
    } else {
      res.status(200).json({ success: true, message: "Article deleted" });
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const getArticle = async (req: Request, res: Response) => {
  try {
    const article = await Article.findOne({
      _id: req.params.id,
      $or: [
        { $and: [{ "teamAccess.user": req.user?.id }, { access: "public" }] },
        { createdBy: req.user?.id },
      ],
    })
      .populate("comments.user")
      .populate("createdBy")
      .populate("teamAccess.user");
    if (!article) {
      res.status(404).json({ error: "Article not found" });
    } else {
      res.status(200).json({ success: true, data: article });
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const getArticleByTag = async (req: Request, res: Response) => {
  try {
    const tag = req.query?.tag as string;
    const articles = await Article.find({
      tags: { $in: tag.split(",") },
      $or: [
        { $and: [{ "teamAccess.user": req.user?.id }, { access: "public" }] },
        { createdBy: req.user?.id },
      ],
    });
    res.status(200).json({ success: true, data: articles });
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const getArticleByCategory = async (req: Request, res: Response) => {
  try {
    const categories = req.query?.category as string;
    const articles = await Article.find({
      categories: { $in: categories.split(",") },
      $or: [
        { $and: [{ "teamAccess.user": req.user?.id }, { access: "public" }] },
        { createdBy: req.user?.id },
      ],
    });
    res.status(200).json({ success: true, data: articles });
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const searchArticleByTitle = async (req: Request, res: Response) => {
  try {
    const title = req.query?.title as string;
    const articles = await Article.find({
      title: { $regex: title, $options: "i" },
      $or: [
        { $and: [{ "teamAccess.user": req.user?.id }, { access: "public" }] },
        { createdBy: req.user?.id },
      ],
    });
    res.status(200).json({ success: true, data: articles });
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const addCommentToArticle = async (req: Request, res: Response) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      res.status(404).json({ error: "Article not found" });
    } else {
      article.comments.push({
        user: req.user?.id as unknown as mongoose.Types.ObjectId,
        comment: req.body.comment,
      });
      await article.save();
      res.status(200).json({ success: true, message: "Comment added" });
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const addUserToArticleTeam = async (req: Request, res: Response) => {
  try {
    const article = await Article.findOne({
      _id: req.params.id,
      $or: [
        { createdBy: req.user?.id },
        {
          $and: [
            { "teamAccess.user": req.user?.id },
            { "teamAccess.role": "admin" },
          ],
        },
      ],
    });
    if (!article) {
      res
        .status(404)
        .json({ error: "Article not found or you don't have access" });
    } else {
      article.teamAccess.push({
        user: req.body.user as unknown as mongoose.Types.ObjectId,
        role: req.body.role,
      });
      await article.save();
      res.status(200).json({ success: true, message: "User added" });
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const getAllArticles = async (req: Request, res: Response) => {
  console.log(req.user?.id);
  try {
    const articles = await Article.find({
      $or: [
        { $and: [{ "teamAccess.user": req.user?.id }, { access: "public" }] },
        { createdBy: req.user?.id },
      ],
    });
    //
    res.status(200).json({ success: true, data: articles });
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};
