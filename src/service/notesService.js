const pool = require("../db/database.js")

const getAllNotes = async () => {
    const [allNotes] = await pool.query("SELECT * FROM notes")
    return allNotes
}

const getNote = async (id) => {
    const [noteRow] = await pool.query("SELECT * FROM notes WHERE id=?", [id])
    return noteRow;
}

const addNote = async (noteVal) => {
    const date = new Date();
    const createdDate = date.toJSON().slice(0,10) + " " + ("0" + date.getUTCHours()).slice(-2)+":"+("0" + date.getUTCMinutes()).slice(-2)+"-"+("0" + date.getUTCSeconds()).slice(-2)
    const [noteRow] = await pool.query("INSERT INTO notes(note, created_at) VALUE (?, ?)", [noteVal, createdDate])
    return await getNote(noteRow.insertId);
    // return noteRow.insertId;
}

const updateNote = async (id, noteVal) => {
    const [noteRow] = await pool.query("UPDATE notes SET note=? WHERE id=?", [noteVal, id])
    return noteRow.affectedRows;
}

const deleteNote = async (id) => {
    const [noteRow] = await pool.query("DELETE FROM notes WHERE id = ?", [id])
    return noteRow.affectedRows;
}

module.exports = {
    getAllNotes,
    getNote,
    addNote,
    updateNote,
    deleteNote
}