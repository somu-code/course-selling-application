import { Router } from "express";
import bcrypt from "bcrypt";
import { Admin } from "../models/admin-model.js";
import Course from "../models/course-model.js";
import {
  generateAdminJWT,
  authenticateAdminJWT,
} from "../jwt-auth/admin-auth.js";

export const adminRouter = Router();

const saltRounds = 8;

adminRouter.post("/signup", async (req, res) => {
  try {
    const { email, password } = await req.body;
    const adminData = await Admin.findOne({ email });
    if (adminData) {
      return res.status(403).json({ message: "Admin email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newAdmin = new Admin({ email, password: hashedPassword });
    await newAdmin.save();
    return res.json({
      message: "Admin created successfully",
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

adminRouter.post("/signin", async (req, res) => {
  try {
    const { email, password } = await req.body;
    const adminData = await Admin.findOne({ email });
    if (!adminData) {
      return res.status(404).json({ message: "Email not found" });
    }
    const isPasswordMath = await bcrypt.compare(password, adminData.password);
    if (!isPasswordMath) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const adminPayload = { id: adminData.id, email: adminData.email, role: adminData.role }
    const adminToken = generateAdminJWT(adminPayload);
    res.cookie("adminAccessToken", adminToken, {
      domain: "localhost",
      path: "/",
      maxAge: 60 * 60 * 1000,
      secure: true,
      sameSite: "strict",
    });
    return res.json({ message: "Signin in successful" });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

adminRouter.get("/profile", authenticateAdminJWT, async (req, res) => {
  try {
    const admin = req.admin;
    res.json(admin);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

adminRouter.post("/logout", authenticateAdminJWT, async (_req, res) => {
  try {
    res.clearCookie("adminAccessToken");
    res.json({ message: "Logout successfully" });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

adminRouter.post("/add-course", authenticateAdminJWT, async (req, res) => {
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

adminRouter.get("/courses", authenticateAdminJWT, async (req, res) => {
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

adminRouter.get("/course", authenticateAdminJWT, async (req, res) => {
  try {
    const courseId = req.query.courseId;
    const course = await Course.findOne({ _id: courseId });
    res.json(course);
  } catch (error) {
    res.sendStatus(500);
  }
});

adminRouter.put("/update-course", authenticateAdminJWT, async (req, res) => {
  try {
    const courseId = req.query.courseId;
    const updatedCourse = req.body;
    if (courseId === updatedCourse._id) {
      const isUpdated = await Course.findByIdAndUpdate(
        courseId,
        updatedCourse,
        { new: true },
      );
      if (isUpdated) {
        return res.json({ message: "Course updated successfully" });
      } else {
        return res.json({ message: "Failed to update course" });
      }
    }
  } catch (error) {
    res.sendStatus(500);
  }
});

adminRouter.delete("/delete-course", authenticateAdminJWT, async (req, res) => {
  try {
    const courseId = req.query.courseId;
    await Course.findByIdAndDelete(courseId);
    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    res.sendStatus(500);
  }
});



adminRouter.delete(
  "/delete-account",
  authenticateAdminJWT,
  async (req, res) => {
    try {
      const admin = req.admin;
      const email = admin.email;
      const adminData = await Admin.findOne({ email });
      const adminId = adminData._id.toString();
      await Course.deleteMany({ owner: adminId });
      await Admin.findByIdAndDelete(adminId);
      res.cookie("accessToken", "", {
        domain: "localhost",
        path: "/",
        secure: true,
        sameSite: "strict",
        httpOnly: true,
        maxAge: 0,
      });
      res.cookie("loggedIn", "", {
        domain: "localhost",
        path: "/",
        secure: true,
        sameSite: "strict",
        maxAge: 0,
      });
      res.json({
        message:
          "Successfully deleted admin account along all the course he/she created.",
      });
    } catch (error) {
      res.sendStatus(500);
    }
  },
);
