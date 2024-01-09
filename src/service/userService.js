const pool = require('../db/database')
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
const CustomApiError = require('../errors');
const {createJWT} = require('../utils/jwt')

const addUser = async (userName, password) => {
    const existingUser = getUserByUserName(userName);
    if( existingUser ) throw new CustomApiError.BadRequestError("User Already Exists. Please login to continue")
    const hashedPass = await bcrypt.hash(password, Number(process.env.SALT_ROUND))
    const [userRow] = await pool.query("INSERT INTO users (user_name, password) VALUES(?, ?)", [userName, hashedPass]);
    return await getUser(userRow.insertId)
}

const getUser = async (id) => {
    const userRow = await pool.query("SELECT * FROM users WHERE id=?", id);
    return userRow
}

const getUserByUserName = async (userName) => {
    const [[user]] = await pool.query("SELECT * FROM users WHERE user_name = ?", [userName])
    return user;
}

const checkLogin = async (userName, password) => {
    const user = await getUserByUserName(userName)
    if( !user ) throw new CustomApiError.UnauthenticatedError("User Does not exist. Please register to continue")
    
    const passMatch = await bcrypt.compare(password, user.password)
    if( !passMatch ) throw new CustomApiError.UnauthenticatedError("Invalid user or password")
    
    return createJWT({payload: {
        userId: user.id,
        loginTime: new Date().toString()
    }})
}

const saveUserDocument = async (user, path, filename, documentType) => {

    await pool.query("INSERT INTO documents (user_id, document_type, path, file_name) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE path=VALUES(path), file_name=VALUES(file_name)", [user.id, documentType, path, filename])
    
    return true;
}

module.exports = {
    addUser,
    checkLogin,
    saveUserDocument
}