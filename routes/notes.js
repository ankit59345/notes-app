import express from "express";
import {getNotes, getNoteById, createNote, updateNote, deleteNote} from '../controllers/notesController.js'
import {validateNotes, validateCreateNotes} from '../middlewares/validators/notesValidator.js';
const notesRouter = express.Router();

notesRouter.route('/').get(getNotes).post(validateCreateNotes, createNote);
notesRouter.route('/:id').get(validateNotes, getNoteById).patch(validateNotes, updateNote).delete(validateNotes, deleteNote);

export default notesRouter