import type { Request, Response } from 'express';
import mongoose from 'mongoose';
import Notes from '../models/note.model';

export const getNotes = async (req: Request, res: Response) => {
  try {
    const notes = await Notes.find().sort({ createdAt: -1 });
    res.json({ notes });
  } catch (error) {
    console.error('Error in getNotes controller: ', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const createNote = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    const note = await Notes.create({ title, content });

    res.status(201).json({ message: 'Note created', data: note });
  } catch (error) {
    console.error('Error in createNote controller: ', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const getSingleNote = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({ message: 'Invalid Id' });
      return;
    }

    const note = await Notes.findById(id);
    if (!note) {
      res.status(404).json({ message: 'Note not found' });
      return;
    }

    res.json(note);
  } catch (error) {
    console.error('Error in getSingleNote controller: ', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const updateNote = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { title, content } = req.body;

    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({ message: 'Invalid Id' });
      return;
    }

    const note = await Notes.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );

    if (!note) {
      res.status(404).json({ message: 'Note not found' });
      return;
    }

    res.json({ message: 'Note updated', note });
  } catch (error) {
    console.error('Error in updateNote controller: ', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const deleteNote = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({ message: 'Invalid Id' });
      return;
    }

    await Notes.findByIdAndDelete(id);
    res.json({ message: 'Note deleted' });
  } catch (error) {
    console.error('Error in deleteNote controller: ', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
