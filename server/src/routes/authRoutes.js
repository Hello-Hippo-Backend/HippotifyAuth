import express from "express";
import { signin, signup, signout } from "../controllers/authController.js";
import authenticateToken from "../middlewares/authenticateToken.js";

const authRoute = express.Router();

authRoute.post("/signin", signin);
authRoute.post("/signup", signup);
authRoute.post("/signout", signout);

// Check Authorization
authRoute.get("/", authenticateToken, (req, res) => {
  return res.status(200).json({
    condition: "success",
    data: {
      id: req.user.id,
      role: req.user.role,
    },
    message: "User is authorized",
  });
});

export default authRoute;
