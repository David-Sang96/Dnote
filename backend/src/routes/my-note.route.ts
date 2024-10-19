import express from 'express';
import { getMyNotes, getMySingleNote } from '../controllers/note.controller';
import isAuth from '../middlewares/isAuth';
const router = express.Router();

router.get('/', isAuth, getMyNotes);

router.get('/:id', isAuth, getMySingleNote);

export default router;
