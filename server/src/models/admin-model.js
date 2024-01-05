import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: {
    type: String,
    default: "admin"
  }
});

export const Admin = mongoose.model("Admin", adminSchema);
