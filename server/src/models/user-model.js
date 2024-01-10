import mongoose from "mongoose";

const userSignupSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  },
  role: {
    type: String,
    default: "user"
  }
});

export const User = mongoose.model("User", userSignupSchema);
