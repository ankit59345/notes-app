const {addUser, checkLogin, saveUserDocument} = require("../service/userService.js")
const CustomApiError = require('../errors')
const fs = require('fs');
const path = require('path');

const registerUser = async (req, res) => {
    const {userName ,password} = req.body;
    await addUser(userName, password);
    return res.status(201).json({success: true, msg: "User Registered Successfully"})
}

const loginUser = async (req, res) => {
    const {userName ,password} = req.body;
    const token = await checkLogin(userName, password);
    return res.status(200).json({success: true, msg: "User Logged IN Successfully", bearerToken: token})
}

const uploadProfilePicture = async (req, res) => {
    const file = req.file;
    if( !file.path ) throw new CustomApiError.BadRequestError("Error while upload profile picture")

    const finalDir = path.join(__dirname, "../../uploads", "user", ''+req.user.id);
    if (!fs.existsSync(finalDir)){
        fs.mkdirSync(finalDir, {recursive: true}, err => {});
    }
    fs.rename(file.path, `uploads/user/${req.user.id}/${file.filename}`, function (err) {
        if (err) throw err
        console.log('Successfully renamed - AKA moved!')
      })
    const docSaved = await saveUserDocument(req.user, file.path.replace("/"+file.filename, ''), file.filename, 'PROFILE_IMAGE');
    if(!docSaved) CustomApiError.CustomApiError("An unknown error occured")

    return res.status(200).json({success: true})
}

module.exports = {
    registerUser,
    loginUser,
    uploadProfilePicture
}