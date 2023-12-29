import express, { json } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./connectDB.mjs";
import dotenv from "dotenv";

dotenv.config({ override: true, path: "../.env" });
const app = express();
app.use(json());

connectDB();

import { adminRouter } from "./routes/admin.mjs";

import { userRouter } from "./routes/user.mjs";

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());

app.get("/ping", async (_req, res) => {
  res.json({ message: "pong" });
});

app.use("/admin", adminRouter);
app.use("/user", userRouter);

app.listen(process.env.PORT, () => {
  console.log(
    `Express server listening on http://localhost:${process.env.PORT}`,
  );
});
