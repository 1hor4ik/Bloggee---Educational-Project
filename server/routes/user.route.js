import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { checkAuth } from "../utils/checkAuth.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({
      status: "error",
      message: "User already exists!",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });

  await newUser.save();
  return res.status(201).json({
    status: "success",
    message: "User registered successfully!",
    user: { id: newUser._id, username: newUser.username, email: newUser.email },
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      status: "error",
      message: "User doesn't exist!",
    });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).json({
      status: "error",
      message: "Invalid Password!",
    });
  }

  const token = jwt.sign({ id: user._id, email: user.email }, process.env.KEY, {
    expiresIn: "3d",
  });

  return res.status(200).json({
    status: "success",
    message: "Login Successful!",
    token,
    user: { id: user._id, username: user.username, email: user.email },
  });
});

router.post("/verify", checkAuth, (req, res) => {
  return res.json({ status: true, message: "You are logged in!" });
});

router.post("/logout", (req, res) => {
  res.status(200).json({ message: "Logged out successfully." });
});

export { router as UserRouter };
