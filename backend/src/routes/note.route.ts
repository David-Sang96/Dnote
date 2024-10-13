import express from 'express';
import { body } from 'express-validator';
import { createNotes, getNotes } from '../controllers/note.controller';
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

route.post('/create', validation(), validationError, createNotes);

export default route;