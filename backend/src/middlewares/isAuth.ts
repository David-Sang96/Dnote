import dotenv from 'dotenv';
import type { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
dotenv.config();

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    res.status(401).json({ message: 'Unauthorized- no token provided' });
    return;
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    if (!decoded) {
      res.status(401).json({ message: 'Unauthorized- invalid token' });
      return;
    }
    req.userId = (decoded as JwtPayload).userId;
    next();
  } catch (error) {
    console.log('Error in isAuth: ', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export default isAuth;
