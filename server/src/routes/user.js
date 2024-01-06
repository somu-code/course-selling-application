import { Router } from "express";
import { User } from "../models/user-model.js";
import bcrypt from "bcrypt";
import { generateUserJWT } from "../jwt-auth/user-auth.js";

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
    return res.json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

userRouter.post("/signin", async (req, res) => {
  try {
    const { email, password } = await req.body;
    const userData = await User.findOne({ email });
    if (!userData) {
      return res.status(404).json({ message: "Email not found" });
    }
    const isPasswordMatch = bcrypt.compare(password, userData.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const userPayload = { id: userData.id, email: userData.email };
    const userToken = generateUserJWT(userPayload);
    res.cookie("userAccessToken", userToken, {
      domain: "localhost",
      path: "/",
      maxAge: 60 * 60 * 1000,
      secure: true,
      sameSite: "strict",
    });
    return res.json({ message: "Sign in successful" });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

userRouter.get("/", async (req, res) => {
  try {
    const data = req.body;
    res.json({ message: "CD working via github actions", data });
  } catch (error) {
    res.sendStatus(500);
  }
});
