import { NextFunction, Request, Response } from "express";
import { AppError, TokenError } from "../errors";

const handleError = (
  err: any,
  req: Request,
  res: Response,
  _: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }
  if (err instanceof TokenError) {
    return res.status(err.statusCode).json({
      error: {
        name: err.name,
        message: err.message,
      },
    });
  }
  console.log(err);
  return res.status(500).json({ message: "Internal server error" });
};

export default handleError;
