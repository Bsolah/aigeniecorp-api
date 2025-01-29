import { Request, Response } from 'express';
import multer from 'multer';
import Document from '../models/Document';
// import { uploadFile } from '../utils/s3utils';

import dotenv from 'dotenv';
import mongoose from "mongoose";

dotenv.config();

const storage = multer.memoryStorage();
const upload = multer({ storage }).single("file");

// export const uploadDocument = (req: Request, res: Response) => {
//   upload(req, res, async (err: any) => {
//     if (err) {
//       return res.status(500).json({ message: 'Error uploading file' });
//     }

//     const file = req.file;
//     if (!file) {
//       return res.status(400).json({ message: 'No file uploaded' });
//     }

//     try {
//       const fileUrl = await uploadFile(file);
//       res.status(200).json({ message: 'File uploaded successfully', fileUrl });
//     } catch (err) {
//       res.status(500).json({ message: 'Error uploading to S3' });
//     }
//   });
// };

export const uploadDocument = (req: Request, res: Response) => {
  upload(req, res, async (err: any) => {
    try {
      const file = req.file;
      const document = await Document.create({
        url: file?.originalname,
        uploadedBy: req?.user?.id,
        privacy: "private",
        categories: req.body.categories?.split(","),
        tags: req.body.tags?.split(","),
        parent: req.body.parent,
        child: req.body.child,
      });
      // const user = new User({ username, email, password });
      await document.save();
      res.status(201).json(document);
    } catch (err: any) {
      res.status(500).json({ message: err });
    }
  });
};

// Share a document with another user
export const shareDocument = async (req: Request, res: Response) => {
  const { userId } = req.body;

  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      res.status(404).json({ error: "Document not found" });
    } else {
      if (document.uploadedBy.toString() !== req.user?.id.toString()) {
        res
          .status(403)
          .json({ error: "Only the document owner can share this document" });
      }

      if (!document.teamAccess.includes(userId)) {
        document.teamAccess.push(userId);
        await document.save();
      }
    }
    res.status(200).json({ message: "Document shared successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get a document (with access control)
export const getDocument = async (req: Request, res: Response) => {
  // router.get('/:id', authenticateUser, checkDocumentAccess, async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      res.status(404).json({ error: "Document not found" });
    } else {
      res.status(200).json({ title: document.url });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};




