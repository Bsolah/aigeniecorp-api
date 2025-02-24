import Folder from "../models/Folder";
import { Request, Response, NextFunction } from "express";

export const createFolder = async (req: Request, res: Response) => {
  try {
    const { name, parent, organizationId } = req.body;

    // Find existing folders with "Untitled" names
    const existingFolders = await Folder.find({ name: /^Untitled( \d+)?$/ });

    // Determine the next "Untitled" number
    const untitledCount = existingFolders.length;
    const untitledFolderName = untitledCount === 0 ? "Untitled" : `Untitled ${untitledCount + 1}`;

    let newFolderName = name ? name : untitledFolderName

    const folder = await Folder.create({
      name: newFolderName,
      createdBy: req.user?.id,
      organizationId: organizationId,
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

export const getRootFolders = async (req: Request, res: Response): Promise<any> => {
  try {
    const { organizationId } = req.query;

    const folder = await Folder.findOne({ parent: null, organizationId: organizationId })
      .populate({ path: "child" })
      .populate({ path: "articles", select: "name" });

    // Merge child folders and articles into one array
    if (!folder) {
      return res.status(404).json({ error: "Folder not found" });
    }

    const mergedItems = [
      ...folder?.child?.map((file: any) => ({ type: 'folder', name: file?.name, id: file?._id })), // Spread the child folders_
      ...folder?.articles?.map((file: any) => ({ type: 'file', name: file?.name, id: file?._id })) // Add 'article' type for differentiation
    ];

    res.status(200).json({
      success: true,
      message: "Folder fetched successfully",
      folder: { id: folder._id, name: folder.name, children: mergedItems }, // Add merged items to the folder object
    });
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const getFolder = async (req: Request, res: Response): Promise<any> => {
  try {
    const folder = await Folder.findById(req.params.id)
      .populate({ path: "child", })
      .populate({ path: "articles", select: "name" });

    // Merge child folders and articles into one array
    if (!folder) {
      return res.status(404).json({ error: "Folder not found" });
    }

    const mergedItems = [
      ...folder.child.map((file: any) => ({ type: 'folder', name: file?.name, id: file?._id, parent: folder?._id })), // Spread the child folders_
      ...folder.articles.map((file: any) => ({ type: 'file', name: file?.name, id: file?._id, parent: folder?._id })) // Add 'article' type for differentiation
    ];

    res.status(200).json({
      success: true,
      message: "Folder fetched successfully",
      folder: { id: folder._id, name: folder.name, children: mergedItems }, // Add merged items to the folder object
    });
    // res.status(200).json({
    //   success: true,
    //   message: "Folder fetched successfully",
    //   folder,
    // });
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
