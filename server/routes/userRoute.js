const express = require("express");
const signin = require("../controllers/user/signin");
const signout = require("../controllers/user/signout");
const signup = require("../controllers/user/signup");
const getUserById = require("../controllers/user/userController");
const verifyAccessToken = require("../middlewares/jwtHandler");
const userRoute = express.Router();

userRoute.post('/signin', signin)
userRoute.post('/signout', signout)
userRoute.post('/signup', signup)
userRoute.get('/', verifyAccessToken, getUserById)


module.exports = userRoute;