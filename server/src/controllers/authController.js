import jwt from "jsonwebtoken";
import * as authModel from "../models/authModel.js";
import { createDefaultPlaylist } from "../models/playlistModel.js";
// import bcrypt from "bcrypt";

export const signin = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      data: null,
      message: "Username and password are required",
    });
  }

  try {
    const user = await authModel.findUserByUsername(username);

    if (!user) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "User not found",
      });
    }

    // Hash password ver.
    // const isPasswordValid = await bcrypt.compare(password, user.password);
    // if (isPasswordValid) {
    if (password === user.password) {
      const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "3h" }
      );

      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 3 * 60 * 60 * 1000, // 3 hours
      });

      return res.status(200).json({
        success: true,
        data: {
          id: user.id,
          username: user.username,
          role: user.role,
        },
        message: "Signed in successfully",
      });
    }

    return res.status(401).json({
      success: false,
      data: null,
      message: "Incorrect username or password",
    });
  } catch (error) {
    console.error("Error during signin:", error);
    return res.status(500).json({
      success: false,
      data: null,
      message: "Internal server error",
    });
  }
};

export const signup = async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).json({
      success: false,
      data: null,
      message: "Email, username, and password are required",
    });
  }

  try {
    const usernameExists = await authModel.findUserByUsername(username);
    if (usernameExists) {
      return res.status(409).json({
        success: false,
        data: null,
        message: "Username is already taken",
      });
    }

    const emailExists = await authModel.findUserByEmail(email);
    if (emailExists) {
      return res.status(409).json({
        success: false,
        data: null,
        message: "Email is already taken",
      });
    }

    // Hash password ver.
    // const hashPass = await bcrypt.hash(password, 10);
    // const userId = await authModel.createUser(username, email, hashPass);
    const userId = await authModel.createUser(username, email, password);

    await createDefaultPlaylist(userId);

    return res.status(201).json({
      success: true,
      data: null,
      message: "Account created successfully",
    });
  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(500).json({
      success: false,
      data: null,
      message: "Internal Server error",
    });
  }
};

export const signout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
  });

  return res.status(200).json({
    success: true,
    data: null,
    message: "Logged out successfully",
  });
};
