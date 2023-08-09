import express, { json } from "express";
const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import db from "./db.mjs";
const PORT = 3000;

import { adminRouter } from "./routes/admin.mjs";
import { userRouter } from "./routes/user.mjs";

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(json());
app.use(cookieParser());

app.use("/admin", adminRouter);
app.use("/user", userRouter);

app.listen(3000, () => {
  console.log(`Express server listening on http://localhost:${PORT}`);
});
