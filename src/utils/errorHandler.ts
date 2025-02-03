import { Response, Request, NextFunction } from "express";
import multer from "multer";

export class BadRequest extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BadRequest";
  }
}

const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("error ", error);
  if (error instanceof BadRequest) {
    res.status(400).json({
      success: false,
      data: error.message,
    });
  } else if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      res.status(400).json({
        success: false,
        data: "File size too large. Max size is 1MB",
      });
    } else {
      res.status(400).json({
        success: false,
        data: "Upload Error",
      });
    }
  } else {
    res.status(500).json({
      success: false,
      data: "Internal Server Error",
    });
  }
};

export default errorHandler;