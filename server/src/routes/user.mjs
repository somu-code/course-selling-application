import express from "express";

export const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  try {
    const data = req.body;
    res.json({ message: "CD working via github actions", data });
  } catch (error) {
    res.sendStatus(500);
  }
});
