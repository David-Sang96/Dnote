import express from 'express';
import { body } from 'express-validator';
import { login, register } from '../controllers/auth.controller';
import User from '../models/auth.model';
import { validationError } from '../ultis/validationError';

const router = express.Router();

const authValidation = () => {
  return [
    body('email')
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Invalid Email')
      .normalizeEmail()
      .custom(async (value, { req }) => {
        const user = await User.findOne({ email: value });
        if (user) {
          return Promise.reject('E-mail already in-use');
        }
      }),
    body('name')
      .trim()
      .notEmpty()
      .withMessage('Name is required')
      .isLength({ min: 3 })
      .withMessage('Name is too short')
      .isLength({ max: 20 })
      .withMessage('Name is too long')
      .custom(async (value, { req }) => {
        const user = await User.findOne({ name: value });
        if (user) {
          return Promise.reject('Username already in-use');
        }
      }),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('Password is required')
      .isLength({ min: 10 })
      .withMessage('Password is too short'),
  ];
};

router.post('/register', authValidation(), validationError, register);

router.post(
  '/login',
  [
    body('email')
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Invalid Email')
      .normalizeEmail(),

    body('password')
      .trim()
      .notEmpty()
      .withMessage('Password is required')
      .isLength({ min: 10 })
      .withMessage('Password is too short'),
  ],
  validationError,
  login
);

export default router;
