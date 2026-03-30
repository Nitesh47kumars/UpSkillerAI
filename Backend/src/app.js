import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Routes Require
import { authRouter } from "./routes/auth.routes.js";
import { interviewRouter } from "./routes/interview.routes.js";

// Route Use
app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);

export default app;
