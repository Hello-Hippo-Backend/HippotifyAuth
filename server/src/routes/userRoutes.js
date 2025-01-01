const express = require("express");
const userRoute = express.Router();
const userController = require("../controllers/userController");

userRoute.get('/', userController.getUser);

module.exports = userRoute;