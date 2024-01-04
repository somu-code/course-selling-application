import mongoose from "mongoose";

const userSignupSchema = new mongoose.Schema({
  email: String,
  password: String
})

export const User = mongoose.model("User", userSignupSchema);
