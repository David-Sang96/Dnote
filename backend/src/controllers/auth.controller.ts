import bcrypt from 'bcryptjs';
import type { Request, Response } from 'express';
import User from '../models/auth.model';
import createToken from '../ultis/createToken';

interface userRequest extends Request {
  body: {
    name?: string;
    email: number;
    password: string;
  };
}

export const register = async (req: userRequest, res: Response) => {
  try {
    const { name, email, password } = req.body;
    await User.create({ name, email, password });

    res.status(201).json({
      message: 'Registered successfully',
    });
  } catch (error) {
    console.error('Error in register controller: ', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const login = async (req: userRequest, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('-__v +password');

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ message: 'Invalid Credential' });
      return;
    }

    const token = createToken({ email: user.email, id: user._id });
    // Create a copy of the user object without the password
    // const { password: _, ...user } = dbUser.toObject();

    res.json({
      message: 'Logged in successfully',
      user: {
        name: user.name,
        email: user.email,
        id: user._id,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      token,
    });
  } catch (error) {
    console.error('Error in login controller: ', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
