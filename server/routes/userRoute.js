const express = require("express");
const { signin } = require("../controllers/auth/signin");
const { signout } = require("../controllers/auth/signout");
const { signup } = require("../controllers/auth/signup");
const userRoute = express.Router();

userRoute.post('/signin', signin)
userRoute.post('/signout', signout)
userRoute.post('/signup', signup)


module.exports = userRoute;