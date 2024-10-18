import jwt from 'jsonwebtoken';
import type mongoose from 'mongoose';

type Props = {
  email: string;
  id: mongoose.Types.ObjectId;
};

const createToken = ({ email, id }: Props) => {
  const token = jwt.sign({ email, userId: id }, process.env.JWT_SECRET!, {
    expiresIn: '1h',
  });

  return token;
};

export default createToken;
