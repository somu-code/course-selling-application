import mongoose from "mongoose";

const mongoURI = "mongodb://localhost:27017/course-selling-app-db";

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
    });
    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(error);
  }
};
