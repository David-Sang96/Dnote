import type { Request, Response } from 'express';

export const getNotes = async (req: Request, res: Response) => {
  try {
    res.end('hello');
  } catch (error) {
    console.error('Error in getNotes controller: ', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const createNotes = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    res.status(201).json({ message: 'note created', data: { title, content } });
  } catch (error) {
    console.error('Error in createNotes controller: ', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
