import mongoose, { ObjectId, Schema } from 'mongoose';

interface INote {
  title: string;
  content: string;
  public_id: string;
  image_url: string;
  author: ObjectId;
}

const noteSchema = new mongoose.Schema<INote>(
  {
    title: { type: String, required: true, minLength: 3, maxLength: 30 },
    content: { type: String, required: true, minLength: 10 },
    public_id: { type: String, required: true },
    image_url: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

// Typing the query middleware with mongoose.Query
noteSchema.pre(/^find/, function (this: mongoose.Query<INote, INote>, next) {
  this.select('-__v');
  this.sort('-createdAt');
  next();
});

const Note = mongoose.model<INote>('Note', noteSchema);

export default Note;
