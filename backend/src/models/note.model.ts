import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, minLength: 3, maxLength: 30 },
    content: { type: String, required: true, minLength: 10 },
    author: { type: String, default: 'Anonymous' },
  },
  { timestamps: true }
);

const Notes = mongoose.model('Notes', noteSchema);

export default Notes;
