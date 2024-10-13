import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

export const validationError = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({
      message: 'Validation Failed',
      errorMessage: errors.array(),
    });
    return;
  }
  next();
};
