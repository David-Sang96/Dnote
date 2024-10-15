import type { Request, Response } from 'express';
import mongoose from 'mongoose';
import Notes from '../models/note.model';
import {
  deleteImageFromCloudinary,
  uploadImageOnCloudinary,
} from '../ultis/UploadOnCloud';

export const getNotes = async (req: Request, res: Response) => {
  const currentPage = Number(req.query.page) || 1;
  const perPageCount = 9;
  const skip = (currentPage - 1) * perPageCount;
  try {
    const notes = await Notes.find()
      .skip(skip)
      .limit(perPageCount)
      .sort('-createdAt');
    const totalNotes = await Notes.countDocuments();
    const totalPages = Math.ceil(totalNotes / perPageCount);
    res.json({ notes, totalNotes, totalPages });
  } catch (error) {
    console.error('Error in getNotes controller: ', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const createNote = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;

    if (req.errorMessage) {
      res.status(422).json({ message: req.errorMessage });
      return;
    }

    if (!req.file) {
      res.status(400).json({ message: 'No file uploaded' });
      return;
    }

    const { public_id, image_url } = await uploadImageOnCloudinary(
      req.file.path
    );

    const note = await Notes.create({
      title,
      content,
      public_id,
      image_url,
    });

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
    const { title, content } = req.body;

    if (!mongoose.isValidObjectId(req.params.id)) {
      res.status(400).json({ message: 'Invalid Id' });
      return;
    }

    if (req.errorMessage) {
      res.status(422).json({ message: req.errorMessage });
      return;
    }

    const note = await Notes.findById(req.params.id);
    if (!note) {
      res.status(404).json({ message: 'Note not found' });
      return;
    }

    if (note.public_id && req.file) {
      await deleteImageFromCloudinary(note.public_id);

      const { public_id, image_url } = await uploadImageOnCloudinary(
        req.file.path
      );
      note.public_id = public_id;
      note.image_url = image_url;
    }

    note.title = title;
    note.content = content;

    note.save();

    res.json({ message: 'Note updated', note });
  } catch (error) {
    console.error('Error in updateNote controller: ', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const deleteNote = async (req: Request, res: Response) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      res.status(400).json({ message: 'Invalid Id' });
      return;
    }

    const note = await Notes.findById(req.params.id);
    if (!note) {
      res.status(404).json({ message: 'Note not found' });
      return;
    }

    await deleteImageFromCloudinary(note.public_id);
    await Notes.findByIdAndDelete(note._id);

    res.json({ message: 'Note deleted' });
  } catch (error) {
    console.error('Error in deleteNote controller: ', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
