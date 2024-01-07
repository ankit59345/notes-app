const {addUser} = require("../service/userService.js")
const CustomApiError = require('../errors')

const registerUser = async (req, res, next) => {
    const {userName ,password} = req.body;
    await addUser(userName, password);
    return res.status(201).json({success: true, msg: "User Registered Successfully"})
}

module.exports = {
    registerUser
}