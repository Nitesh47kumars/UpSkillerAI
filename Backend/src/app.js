import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";

const app = express()

app.use(express.json());
app.use(cookieParser())
app.use(urlencoded({extended:true}));

// Routes Require
import { authRouter } from "./routes/auth.routes.js";

// Route Use
app.use("/api/auth", authRouter)

export default app;