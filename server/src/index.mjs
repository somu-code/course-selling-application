import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./connectDB.mjs";

import { adminRouter } from "./routes/admin.mjs";
import { userRouter } from "./routes/user.mjs";

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());

connectDB();

app.use("/admin", adminRouter);
app.use("/user", userRouter);

app.get("/ping", async (_req, res) => {
  res.json({ message: "pong" });
});

app.listen(process.env.PORT, () => {
  console.log(
    `Express server listening on http://localhost:${process.env.PORT}`,
  );
});
