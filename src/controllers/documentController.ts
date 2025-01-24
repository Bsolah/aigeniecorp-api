import { Request, Response } from 'express';
import multer from 'multer';
import { uploadFile } from '../utils/s3utils';

const storage = multer.memoryStorage();
const upload = multer({ storage}).single('file');

export const uploadDocument = (req: Request, res: Response) => {
  upload(req, res, async (err: any) => {
    if (err) {
      return res.status(500).json({ message: 'Error uploading file' });
    }

    const file = req.file;
    console.log('file ', file);
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    try {
      const fileUrl = await uploadFile(file);
      res.status(200).json({ message: 'File uploaded successfully', fileUrl });
    } catch (err) {
      res.status(500).json({ message: 'Error uploading to S3' });
    }
  });
};
