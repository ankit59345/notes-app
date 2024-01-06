import {addNote, getAllNotes, getNote} from "../db/database.js"

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