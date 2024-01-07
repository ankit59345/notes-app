const pool = require('../db/database')
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
const CustomApiError = require('../errors');
const {createJWT} = require('../utils/jwt')

const addUser = async (userName, password) => {
    const hashedPass = await bcrypt.hash(password, Number(process.env.SALT_ROUND))
    const [userRow] = await pool.query("INSERT INTO users (user_name, password) VALUES(?, ?)", [userName, hashedPass]);
    return await getUser(userRow.insertId)
}

const getUser = async (id) => {
    const userRow = await pool.query("SELECT * FROM users WHERE id=?", id);
    
}

const checkLogin = async (userName, password) => {
    const [[user]] = await pool.query("SELECT * FROM users WHERE user_name = ?", [userName])
    if( !user ) throw new CustomApiError.UnauthenticatedError("Invalid login")
    
    const passMatch = await bcrypt.compare(password, user.password)
    if( !passMatch ) throw new CustomApiError.UnauthenticatedError("Invalid login")
    
    return createJWT({payload: {
        userId: user.id,
        loginTime: new Date().toString()
    }})
}

module.exports = {
    addUser,
    checkLogin
}