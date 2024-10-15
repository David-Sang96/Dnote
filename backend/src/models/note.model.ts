import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, minLength: 3, maxLength: 30 },
    content: { type: String, required: true, minLength: 10 },
    public_id: { type: String, required: true },
    image_url: { type: String, required: true },
    author: { type: String, default: 'Anonymous' },
  },
  { timestamps: true }
);

const Notes = mongoose.model('Notes', noteSchema);

export default Notes;
