import { Router } from "express";
import { User } from "../models/user-model.js";
import bcrypt from "bcrypt";
import { authenticateUserJWT, generateUserJWT } from "../jwt-auth/user-auth.js";
import Course from "../models/course-model.js";

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
      return res.status(404).json({ message: "User email not found" });
    }
    const isPasswordMatch = await bcrypt.compare(password, userData.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const userPayload = { _id: userData._id, email: userData.email };
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

userRouter.get("/profile", authenticateUserJWT, async (req, res) => {
  try {
    const user = req.user;
    const userData = await User.find({ _id: user._id });
    return res.json(userData);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

userRouter.post("/logout", authenticateUserJWT, async (_req, res) => {
  try {
    res.clearCookie("userAccessToken");
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

userRouter.delete("/delete-account", authenticateUserJWT, async (req, res) => {
  try {
    const user = req.user;
    await User.findOneAndDelete({ _id: user._id });
    res.clearCookie("userAccessToken");
    res.json({ message: "User account deleted successfully" });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

userRouter.get("/courses", authenticateUserJWT, async (_req, res) => {
  try {
    const courses = await Course.find({});
    res.json(courses);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

userRouter.post("/purchase-course", authenticateUserJWT, async (req, res) => {
  try {
    const user = req.user;
    const { courseId } = req.body;
    await User.findByIdAndUpdate(user._id, {
      $addToSet: { coursesBrought: courseId },
    });
    await Course.findByIdAndUpdate(courseId, {
      $addToSet: { enrolledByStudents: user._id },
    });
    res.json({ message: `User ${user._id} purchased Course ${courseId}` });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});
