import cors from 'cors';
import dotenv from 'dotenv';
import express, { type Request, type Response } from 'express';
import morgan from 'morgan';
import path from 'path';

import authRoutes from './routes/auth.route';
import noteRoutes from './routes/note.route';
import connectDB from './ultis/db';

dotenv.config();
const PORT = process.env.PORT || 3200;
const app = express();

app.use(express.json({ limit: '10kb' }));
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/notes', noteRoutes);
app.use('/api/v1/auth', authRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../frontend/dist')));

  app.get('*', (req: Request, res: Response) => {
    res.sendFile(
      path.resolve(__dirname, '../../frontend', 'dist', 'index.html')
    );
  });
}

app.listen(PORT, async () => {
  await connectDB();
  console.log(`server is running on port: ${PORT}`);
});
