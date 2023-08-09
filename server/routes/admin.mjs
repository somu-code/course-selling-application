import express from "express";
import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import Admin from "../models/admin-model.mjs";
import Course from "../models/course-model.mjs";
import {
  generateAdminJWT,
  authenticateAdminJWT,
} from "../jwt-auth/admin-auth.mjs";

export const adminRouter = express.Router();

adminRouter.get("/", async (req, res) => {
  try {
    res.json({ message: "hello admin" });
  } catch (error) {
    res.sendStatus(500);
  }
});

adminRouter.post("/admin/signup", async (req, res) => {
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

adminRouter.post("/admin/signin", async (req, res) => {
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

adminRouter.post(
  "/admin/add-course",
  authenticateAdminJWT,
  async (req, res) => {
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
  }
);

adminRouter.get("/admin/courses", authenticateAdminJWT, async (req, res) => {
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

adminRouter.get("/admin/course", authenticateAdminJWT, async (req, res) => {
  try {
    const courseId = req.query.courseId;
    const course = await Course.findOne({ _id: courseId });
    res.json(course);
  } catch (error) {
    res.sendStatus(500);
  }
});

adminRouter.put(
  "/admin/update-course",
  authenticateAdminJWT,
  async (req, res) => {
    try {
      const courseId = req.query.courseId;
      const updatedCourse = req.body;
      if (courseId === updatedCourse._id) {
        const isUpdated = await Course.findByIdAndUpdate(
          courseId,
          updatedCourse,
          { new: true }
        );
        if (isUpdated) {
          return res.json({ message: "Course Updated successfully" });
        } else {
          return res.json({ message: "Failed to update course" });
        }
      }
    } catch (error) {
      res.sendStatus(500);
    }
  }
);

adminRouter.get("/admin/profile", authenticateAdminJWT, async (req, res) => {
  try {
    const admin = req.admin;
    res.json({ email: admin.email });
  } catch (error) {
    res.sendStatus(500);
  }
});

adminRouter.get("/admin/logout", authenticateAdminJWT, async (req, res) => {
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
