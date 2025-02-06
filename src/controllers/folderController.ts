import Folder from "../models/Folder";
import { Request, Response, NextFunction } from "express";

export const createFolder = async (req: Request, res: Response) => {
  try {
    const { name, parent } = req.body;
    const folder = await Folder.create({
      name,
      createdBy: req.user?.id,
      parent,
    });
    if (parent) {
      const parentFolder = await Folder.findById(parent);
      if (parentFolder) {
        parentFolder.child.push(folder._id as any);
        await parentFolder.save();
      }
    }
    res.status(201).json({
      success: true,
      message: "Folder created successfully",
      folder,
    });
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const editFolder = async (req: Request, res: Response) => {
  try {
    const { name, parent } = req.body;
    const folder = await Folder.findByIdAndUpdate(
      req.params.id,
      { name, parent },
      { new: true },
    );
    res.status(200).json({
      success: true,
      message: "Folder updated successfully",
      folder,
    });
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const getRootFolders = async (req: Request, res: Response) => {
  try {
    const folders = await Folder.find({ parent: null })
      .populate("child")
      .populate("articles", "title");
    res.status(200).json({
      success: true,
      message: "Folders fetched successfully",
      folders,
    });
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const getFolder = async (req: Request, res: Response) => {
  try {
    const folder = await Folder.findById(req.params.id)
      .populate("child")
      .populate("articles", "title")
      .populate("child.child");
    res.status(200).json({
      success: true,
      message: "Folder fetched successfully",
      folder,
    });
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const deleteFolder = async (req: Request, res: Response) => {
  try {
    const folder = await Folder.findById(req.params.id);
    if (!folder) {
      res.status(404).json({ error: "Folder not found" });
    } else {
      if (folder.child.length > 0) {
        res.status(400).json({
          message: "Folder has sub folders. Please delete them first",
        });
      } else if (folder.articles.length > 0) {
        res.status(400).json({
          message: "Folder has articles. Please delete them first",
        });
      } else {
        await Folder.findByIdAndDelete(req.params.id);
        res.status(200).json({
          success: true,
          message: "Folder deleted successfully",
        });
      }
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};
