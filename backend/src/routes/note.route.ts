import express from 'express';
import { body } from 'express-validator';
import {
  createNote,
  deleteNote,
  getNotes,
  getSingleNote,
  updateNote,
} from '../controllers/note.controller';
import isAuth from '../middlewares/isAuth';
import { multerUpload } from '../ultis/multer';
import { validationError } from '../ultis/validationError';

const route = express.Router();

const validation = () => {
  return [
    body('title')
      .trim()
      .isLength({ min: 3 })
      .withMessage('Title is too short')
      .isLength({ max: 30 })
      .withMessage('Title is too long')
      .notEmpty()
      .withMessage('Title is required'),
    body('content')
      .trim()
      .isLength({ min: 10 })
      .withMessage('Content is too short')
      .notEmpty()
      .withMessage('Content is required'),
  ];
};

route.get('/', getNotes);

route.get('/:id', getSingleNote);

route.post(
  '/create',
  isAuth,
  multerUpload,
  validation(),
  validationError,
  createNote
);

route.patch(
  '/update/:id',
  isAuth,
  multerUpload,
  validation(),
  validationError,
  updateNote
);

route.delete('/:id', isAuth, deleteNote);

export default route;
