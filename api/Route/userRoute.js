const express = require("express");
const userCtrl = require("../Controller/userController");
const auth = require("../Middleware/authentication");

const userRouter = express.Router();

userRouter.route("/register").post(userCtrl.registerUser);

userRouter.route("/login").post(userCtrl.loginUser);

userRouter.route("/logout").post(auth, userCtrl.logoutUser);

userRouter.route("/")
    .patch(auth, userCtrl.updateUser)
    .get(auth, userCtrl.getUser);

module.exports = userRouter;