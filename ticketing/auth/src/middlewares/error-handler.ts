import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("something went wrong", err);

  return res.status(400).send({
    message: "Something went wrong",
  });
};
