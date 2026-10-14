import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";
import mongoose from "mongoose";
import { Server } from "socket.io";
import { checkAuth } from "./utils/checkAuth.js";
import { UserRouter } from "./routes/user.route.js";
import { PostRouter } from "./routes/post.route.js";
import mongoSanitize from "express-mongo-sanitize";
import { rateLimit } from "express-rate-limit";
import { xss } from "express-xss-sanitizer";
import http from "http";
import hpp from "hpp";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://bloggee-test-app.onrender.com",
  },
});
const PORT = process.env.PORT || 5000;
const dbURI =
  "mongodb+srv://Ihor:Il1234@blogcluster.m9cve.mongodb.net/?retryWrites=true&w=majority&appName=BlogCluster";

app.use(
  cors({
    origin: "https://bloggee-test-app.onrender.com",
  })
);
app.use(mongoSanitize());
app.use(xss());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});
app.use(limiter);
app.use(hpp());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/auth", UserRouter);
app.use("/posts", PostRouter);

app.get("/", (req, res) => {
  res.send("Hi Node!");
});

mongoose
  .connect(dbURI)
  .then((result) => console.log("connected to db"))
  .catch((err) => console.log(err));

cloudinary.config({
  cloud_name: "dsb8ycqpc",
  api_key: "668167931452759",
  api_secret: "9u4ZS85V7Zk1zPoWMFONxtKJklo",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    public_id: (req, file) =>
      `${file.originalname.split(".")[0]}-${Date.now()}`,
  },
});

const upload = multer({ storage });

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  console.log("Uploaded file:", req.file);
  console.log("Cloudinary response:", req.file.path);

  if (req.file) {
    res.json({
      url: req.file.path,
    });
  } else {
    res.status(400).json({ error: "File upload failed" });
  }
});

io.on("connection", (socket) => {
  socket.on("comment", (msg) => {
    io.emit("new-comment", msg);
  });
});

server.listen(PORT, () => {
  console.log("Server is running on port 5000");
});

export default io;
