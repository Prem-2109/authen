import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import authRoutes from "./routes/authroutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

// DB
connectDB();

// Body & cookies
app.use(express.json());
app.use(cookieParser());

// 🔥 CORS (Vercel + Cookies SAFE)
app.use(
  cors({
    origin: "https://authenclient.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

// 🔥 Preflight fix
app.options("*", cors());

// Routes
app.get("/", (req, res) => res.send("API Working"));
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

export default app;
