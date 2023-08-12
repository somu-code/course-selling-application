import express from "express";

export const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  try {
    const data = req.body;
    res.json({ message: "Hello, user", data });
  } catch (error) {
    res.sendStatus(500);
  }
});
