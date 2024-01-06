import express from "express";
import {getNotes, getNoteById, createNote, updateExistingNote, deleteExistingNote} from '../controllers/notesController.js'
import {validateNotes, validateCreateNotes} from '../middlewares/validators/notesValidator.js';
const notesRouter = express.Router();

notesRouter.route('/').get(getNotes).post(validateCreateNotes, createNote);
notesRouter.route('/:id').get(validateNotes, getNoteById).patch([validateNotes, validateCreateNotes], updateExistingNote).delete(validateNotes, deleteExistingNote);

export default notesRouter