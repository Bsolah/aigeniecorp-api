import { Response, Request, NextFunction } from "express";

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
    console.log('error ', error)
  if (error instanceof BadRequest) {
    res.status(400).json({
      success: false,
      data: error.message,
    });
  } else {
    res.status(500).json({
      success: false,
      data: "Internal Server Error",
    });
  }
};

export default errorHandler;