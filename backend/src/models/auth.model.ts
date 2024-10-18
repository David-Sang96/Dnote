import bcrypt from 'bcryptjs';
import mongoose, { Schema } from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 10,
      unique: true,
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    notes: { type: Schema.Types.ObjectId, ref: 'Note' },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model('Users', userSchema);

export default User;
