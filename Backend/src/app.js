import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:5173", process.env.VITE_FRONTEND_URL],
    credentials: true,
  })
);

// Routes Require
import { authRouter } from "./routes/auth.routes.js";
import { interviewRouter } from "./routes/interview.routes.js";

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend is running successfully 🚀",
  });
});

// Route Use
app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);

export default app;
