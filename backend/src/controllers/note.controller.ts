import type { Request, Response } from 'express';
import mongoose from 'mongoose';
import Note from '../models/note.model';
import {
  deleteImageFromCloudinary,
  uploadImageOnCloudinary,
} from '../ultis/UploadOnCloud';

export const getNotes = async (req: Request, res: Response) => {
  const searchQuery = req.query.search || '';
  const currentPage = Number(req.query.page) || 1;
  const perPageCount = 9;
  const skip = (currentPage - 1) * perPageCount;

  const filter = searchQuery
    ? {
        $or: [
          { title: { $regex: searchQuery, $options: 'i' } },
          { content: { $regex: searchQuery, $options: 'i' } },
        ],
      }
    : {};

  try {
    const notes = await Note.find(filter).skip(skip).limit(perPageCount);

    const totalNotes = await Note.countDocuments();
    const totalPages = Math.ceil(totalNotes / perPageCount);
    res.json({ notes, totalNotes, totalPages });
  } catch (error) {
    console.error('Error in getNotes controller: ', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const getMyNotes = async (req: Request, res: Response) => {
  const currentPage = Number(req.query.page) || 1;
  const perPageCount = 9;
  const skip = (currentPage - 1) * perPageCount;
  try {
    const notes = await Note.find({ author: req.userId })
      .skip(skip)
      .limit(perPageCount);

    const totalNotes = await Note.find({ author: req.userId }).countDocuments();
    const totalPages = Math.ceil(totalNotes / perPageCount);
    res.json({ notes, totalNotes, totalPages });
  } catch (error) {
    console.error('Error in getMyNotes controller: ', error);
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

    const note = await Note.create({
      title,
      content,
      public_id,
      image_url,
      author: req.userId,
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

    const note = await Note.findById(id);
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

export const getMySingleNote = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({ message: 'Invalid Id' });
      return;
    }

    const note = await Note.findById(id);
    if (!note) {
      res.status(404).json({ message: 'Note not found' });
      return;
    }

    const isCurrentUser = note.author.toString() === req.userId;

    if (!isCurrentUser) {
      res
        .status(403)
        .json({ message: 'Not allowed to performance the action' });
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

    const note = await Note.findById(req.params.id);
    if (!note) {
      res.status(404).json({ message: 'Note not found' });
      return;
    }

    const isCurrentUser = note.author.toString() === req.userId;

    if (!isCurrentUser) {
      res
        .status(403)
        .json({ message: 'Not allowed to performance the action' });
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

    const note = await Note.findById(req.params.id);
    if (!note) {
      res.status(404).json({ message: 'Note not found' });
      return;
    }

    const isCurrentUser = note.author.toString() === req.userId;

    if (!isCurrentUser) {
      res
        .status(403)
        .json({ message: 'Not allowed to performance the action' });
      return;
    }

    await deleteImageFromCloudinary(note.public_id);
    await Note.findByIdAndDelete(note._id);

    res.json({ message: 'Note deleted' });
  } catch (error) {
    console.error('Error in deleteNote controller: ', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
