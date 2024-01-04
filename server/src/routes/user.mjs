import { Router } from "express";
import { User } from "../models/user-model.mjs";
import bcrypt from "bcrypt";

export const userRouter = Router();

const saltRounds = 8;

userRouter.post("/signup", async (req, res) => {
  try {
    const { email, password } = await req.body;
    const userData = await User.findOne({ email });
    if (userData) {
      return res.status(403).json({ message: "User email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    return res.json({ message: "User created successfully" })
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
})

userRouter.get("/", async (req, res) => {
  try {
    const data = req.body;
    res.json({ message: "CD working via github actions", data });
  } catch (error) {
    res.sendStatus(500);
  }
});
