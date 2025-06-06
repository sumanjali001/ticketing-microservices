import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custom-error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    return next(err); // ✅ Prevents sending multiple responses
  }
  //console.error(err);
  if (err instanceof CustomError) {
    res.status(err.statusCode).json({ errors: err.serializeErrors() });
  }
  res.status(400).json({
    errors: [{ message: "something went wrong" }],
  });
};
