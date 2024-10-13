import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const connectToMongoDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGODB_URI!);
    console.log(`Connected to MongoDB: ${con.connection.host}`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error connecting to MongoDB: " + error.message);
    }
    process.exit(1);
  }
};

export default connectToMongoDB;
