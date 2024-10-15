import type { Request } from 'express';
import multer, { type FileFilterCallback } from 'multer';

// extend express request type
declare global {
  namespace Express {
    interface Request {
      errorMessage: string;
    }
  }
}

const storage = multer.diskStorage({});

const fileFilter = function (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) {
  // check for jpeg with the e or without the e
  const fileTypes = ['image/jpeg', 'image/png'];
  if (fileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    req.errorMessage = 'File is not a valid image';
    cb(null, false);
  }
};

export const multerUpload = multer({
  storage,
  fileFilter,
  limits: { fieldSize: 1024 * 1024 * 5 },
}).single('cover_image');
