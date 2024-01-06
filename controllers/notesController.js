import {addNote, getAllNotes, getNote, updateNote, deleteNote} from "../db/database.js"

export const getNotes = async (req, res, next) => {
    try {
        const notes = await getAllNotes();
        // if( !notes ) return res.json({success: false, notes: {}})
        return res.json({success: true, notes})
    }catch( err ) {
        next(err)
    }
}

export const getNoteById = async (req, res, next) => {
    try {
        const {id, name} = req.params
        const notes = await getNote(id);
        return res.json({success: true, notes})
    }catch( err ) {
        next(err)
    }
}

export const createNote = async (req, res, next) => {
    try {
        const {note} = req.body;
        const noteRow = await addNote(note);
        if( !noteRow ) return res.status(400).json({success: false, notes: {}})
        
        return res.status(201).json({success: true, notes: noteRow})
    }catch( err ) {
        next(err)
    }
}

export const updateExistingNote = async (req, res, next) => {
    try {
        const {id} = req.params;
        const {note} = req.body;
        console.log(id, note);
        const noteRow = await getNote(id);
        if( !noteRow ) return res.status(400).json({success: false, msg: "Data Does not exist", notes: {}})
        const affectedRows = await updateNote(id, note);
        if( !affectedRows ) return res.status(400).json({success: false, notes: {}})
        
        return res.status(201).json({success: true, notes: affectedRows})
    }catch( err ) {
        next(err)
    }
}

export const deleteExistingNote = async (req, res, next) => {
    try {
        const {id} = req.params;
        const noteRow = await getNote(id);
        if( !noteRow ) return res.status(400).json({success: false, msg: "Data Does not exist", notes: {}})

        const rowsAffected = await deleteNote(id);
        const resObj = rowsAffected==1 ? {success: true} : {success: false}
        
        return res.status((rowsAffected==1 ? 200 : 420)).json(resObj)
    }catch( err ) {
        next(err)
    }
}