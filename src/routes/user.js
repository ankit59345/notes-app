const express = require("express");
require('express-async-errors');
const userRouter = express.Router();
const imageUpload = require("../middlewares/image-upload")
const {authenticateUser} = require('../middlewares/auth')


const {registerUser, loginUser, uploadProfilePicture, getProfilePicture} = require('../controllers/userController')
const {validateRegisterUser} = require('../validators/userValidator')

userRouter.route('/register').post(validateRegisterUser, registerUser)
userRouter.route('/login').post(validateRegisterUser, loginUser)
userRouter.route('/profilePicture')
.post(authenticateUser, imageUpload.single('profilePicture'), uploadProfilePicture)
.get(authenticateUser, getProfilePicture)


module.exports = userRouter