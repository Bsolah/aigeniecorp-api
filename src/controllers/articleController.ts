import { Request, Response, NextFunction } from "express";
import Article from "../models/Article";
import mongoose from "mongoose";

export const createArticle = async (req: Request, res: Response) => {
  try {
    const { title, content, tags, categories, parent, child } = req.body;
    const article = await Article.create({
      title,
      content,
      createdBy: req.user?.id,
      tags,
      categories,
      parent,
      child,
    });
    res.status(201).json({
      success: true,
      message: "Article created successfully",
      article,
    });
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const editArticle = async (req: Request, res: Response) => {
  try {
    const { title, content, tags, categories, parent, child } = req.body;
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      { title, content, tags, categories, parent, child },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Article updated successfully",
      article,
    });
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const deleteArticle = async (req: Request, res: Response) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Article deleted" });
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const getArticle = async (req: Request, res: Response) => {
  try {
    const article = await Article.findById(req.params.id)
      .populate("comments.user")
      .populate("createdBy")
      .populate("parent")
      .populate("child");
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
    const articles = await Article.find({ tags: { $in: tag.split(",") } });
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
