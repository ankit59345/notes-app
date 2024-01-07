const express = require("express");
require('express-async-errors');
const userRouter = express.Router();
const {registerUser, loginUser} = require('../controllers/userController')
const {validateRegisterUser} = require('../validators/userValidator')

userRouter.route('/register').post(validateRegisterUser, registerUser)
userRouter.route('/login').post(validateRegisterUser, loginUser)


module.exports = userRouter