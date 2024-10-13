import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';

import noteRoutes from './routes/note.route';
import connectToMongoDB from './ultis/db';

dotenv.config();
const PORT = process.env.PORT || 3200;
const app = express();

app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/notes', noteRoutes);

app.listen(PORT, async () => {
  await connectToMongoDB();
  console.log(`server is running on port: ${PORT}`);
});
