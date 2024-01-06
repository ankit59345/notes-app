import express from "express";
import {getNotes, getNoteById, createNote} from '../controllers/notesController.js'
const notesRouter = express.Router();

notesRouter.route('/').get(getNotes).post(createNote);

notesRouter.get('/:id', async (req, res) => {
    return await getNoteById(req, res);
})

export default notesRouter