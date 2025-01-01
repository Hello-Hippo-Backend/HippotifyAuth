const express = require("express");
const authRoute = express.Router();
const authController = require("../controllers/authController");
const authenticateToken = require("../middlewares/authenticateToken");

authRoute.post("/signin", authController.signin);
authRoute.post("/signup", authController.signup);
authRoute.post("/signout", authController.signout);

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

module.exports = authRoute;
