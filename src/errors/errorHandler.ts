import { Request, Response, NextFunction } from "express";
import { NotFoundError } from "./NotFoundError";
import { ConflictError } from "./ConflictError";
import { BadRequestError } from "./BadRequestError";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (err instanceof NotFoundError) {
    res.status(404).json({
      error: "Not Found",
      message: err.message,
      statusCode: 404,
    });
  } else if (err instanceof ConflictError) {
    res.status(409).json({
      error: "Conflict",
      message: err.message,
      statusCode: 409,
    });
  } else if (err instanceof BadRequestError) {
    res.status(400).json({
      error: "Bad Request",
      message: err.message,
      statusCode: 400,
    });
  } else {
    res.status(500).json({
      error: "Internal Server Error",
      message: err.message,
      statusCode: 500,
    });
  }
};

