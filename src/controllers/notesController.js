import {addNote, getAllNotes, getNote, updateNote, deleteNote} from "../service/notesService.js"

export const getNotes = async (req, res, next) => {
    const notes = await getAllNotes();
    // if( !notes ) return res.json({success: false, notes: {}})
    return res.json({success: true, notes})
}

export const getNoteById = async (req, res, next) => {
    const {id, name} = req.params
    const notes = await getNote(id);
    return res.json({success: true, notes})
}

export const createNote = async (req, res, next) => {
    const {note} = req.body;
    const noteRow = await addNote(note);
    if( !noteRow ) return res.status(400).json({success: false, notes: {}})
    
    return res.status(201).json({success: true, notes: noteRow})
}

export const updateExistingNote = async (req, res, next) => {
    const {id} = req.params;
    const {note} = req.body;
    console.log(id, note);
    const noteRow = await getNote(id);
    if( !noteRow ) return res.status(400).json({success: false, msg: "Data Does not exist", notes: {}})
    const affectedRows = await updateNote(id, note);
    if( !affectedRows ) return res.status(400).json({success: false, notes: {}})
    
    return res.status(201).json({success: true, notes: affectedRows})
}

export const deleteExistingNote = async (req, res, next) => {
    const {id} = req.params;
    const noteRow = await getNote(id);
    if( !noteRow ) return res.status(400).json({success: false, msg: "Data Does not exist", notes: {}})

    const rowsAffected = await deleteNote(id);
    const resObj = rowsAffected==1 ? {success: true} : {success: false}
    
    return res.status((rowsAffected==1 ? 200 : 420)).json(resObj)
}