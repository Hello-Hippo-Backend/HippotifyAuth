import express from "express";
import { getUser } from "../controllers/userController.js";

const userRoute = express.Router();

userRoute.get("/", getUser);

export default userRoute;
