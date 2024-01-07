const pool = require('../db/database')
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

const addUser = async (userName, password) => {
    const hashedPass = await bcrypt.hash(password, Number(process.env.SALT_ROUND))
    const [userRow] = await pool.query("INSERT INTO users (user_name, password) VALUES(?, ?)", [userName, hashedPass]);
    return await getUser(userRow.insertId)
}

const getUser = async (id) => {
    const userRow = await pool.query("SELECT * FROM users WHERE id=?", id);
    
}

module.exports = {
    addUser
}