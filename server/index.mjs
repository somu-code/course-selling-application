import express, { json } from "express";
const app = express();
import cors from "cors";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import db from "./db.mjs";
const PORT = 3000;

import dotenv from "dotenv";
import Admin from "./models/admin-model.mjs";
import Course from "./models/course-model.mjs";
import {
  generateAdminJWT,
  authenticateAdminJWT,
} from "./jwt-auth/admin-auth.mjs";
dotenv.config();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(json());
app.use(cookieParser());

app.post("/admin/signup", async (req, res) => {
  try {
    const { email, password } = await req.body;
    const admin = await Admin.findOne({ email });
    if (admin) {
      return res.status(403).json({ message: "Admin email already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 8);
      const newAdmin = new Admin({ email, password: hashedPassword });
      await newAdmin.save();
      return res.json({
        message: "Admin created successfully",
      });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.post("/admin/signin", async (req, res) => {
  try {
    const { email, password } = await req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ error: "Email not found" });
    }
    const isPasswordMath = await bcrypt.compare(password, admin.password);
    if (!isPasswordMath) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const adminToken = generateAdminJWT(email);
    res.cookie("accessToken", adminToken, {
      domain: "localhost",
      path: "/",
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    return res.json({ message: "Logged in successful", email });
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.post("/admin/add-course", authenticateAdminJWT, async (req, res) => {
  try {
    const admin = await req.admin;
    const email = admin.email;
    const owner = await Admin.findOne({ email });
    const ownerId = owner._id;
    const newCourse = { ...req.body, owner: ownerId };
    const course = new Course(newCourse);
    await course.save();
    res.json({ message: "Course created successfully", courseID: course.id });
  } catch (error) {
    res.sendStatus(500);
  }
});

app.get("/admin/courses", authenticateAdminJWT, async (req, res) => {
  try {
    const admin = await req.admin;
    const email = admin.email;
    const owner = await Admin.findOne({ email });
    const ownerId = owner._id;
    const courses = await Course.find({ owner: ownerId });
    res.json(courses);
  } catch (error) {
    res.sendStatus(500);
  }
});

app.get("/admin/profile", authenticateAdminJWT, async (req, res) => {
  try {
    const admin = req.admin;
    res.json({ email: admin.email });
  } catch (error) {
    res.sendStatus(500);
  }
});

app.get("/admin/logout", authenticateAdminJWT, async (req, res) => {
  try {
    res.cookie("accessToken", "", {
      domain: "localhost",
      path: "/",
      secure: true,
      sameSite: "strict",
      httpOnly: true,
      maxAge: 0,
    });
    res.json({ message: "Logout successfully" });
  } catch (error) {
    res.sendStatus(500);
  }
});

app.listen(3000, () => {
  console.log(`Express server listening on http://localhost:${PORT}`);
});
