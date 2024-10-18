import express from 'express';
import { getMyNotes } from '../controllers/note.controller';
import isAuth from '../middlewares/isAuth';
const router = express.Router();

router.get('/', isAuth, getMyNotes);

export default router;
