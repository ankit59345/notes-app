import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

export const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();


export const getAllNotes = async () => {
    const [allNotes] = await pool.query("SELECT * FROM notes")
    return allNotes
}

export const getNote = async (id) => {
    const [noteRow] = await pool.query("SELECT * FROM notes WHERE id=?", [id])
    return noteRow[0];
}

export const addNote = async (noteVal) => {
    const date = new Date();
    const createdDate = date.toJSON().slice(0,10) + " " + ("0" + date.getUTCHours()).slice(-2)+":"+("0" + date.getUTCMinutes()).slice(-2)+"-"+("0" + date.getUTCSeconds()).slice(-2)
    const [noteRow] = await pool.query("INSERT INTO notes(note, created_at) VALUE (?, ?)", [noteVal, createdDate])
    return await getNote(noteRow.insertId);
    // return noteRow.insertId;
}

// console.log("Added Row is: ", await addNote("Hey There Node 2"));
// console.log(await getAllNotes());
// console.log(await getNote(1));