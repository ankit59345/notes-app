const {addUser, checkLogin} = require("../service/userService.js")
const CustomApiError = require('../errors')

const registerUser = async (req, res, next) => {
    const {userName ,password} = req.body;
    await addUser(userName, password);
    return res.status(201).json({success: true, msg: "User Registered Successfully"})
}

const loginUser = async (req, res, next) => {
    const {userName ,password} = req.body;
    const token = await checkLogin(userName, password);
    return res.status(201).json({success: true, msg: "User Logged IN Successfully", bearerToken: token})
}

module.exports = {
    registerUser,
    loginUser
}