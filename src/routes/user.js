const express = require("express");
require('express-async-errors');
const userRouter = express.Router();
const {registerUser} = require('../controllers/userController')
const {validateRegisterUser} = require('../validators/userValidator')

userRouter.route('/register').post(validateRegisterUser, registerUser)


module.exports = userRouter