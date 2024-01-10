import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
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
    default: "admin",
  },
});

export const Admin = mongoose.model("Admin", adminSchema);
