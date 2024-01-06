import express from "express";
import {asyncWrapper} from '../middlewares/asyncWrapper.js';
import {getNotes, getNoteById, createNote, updateExistingNote, deleteExistingNote} from '../controllers/notesController.js'
import {validateNotes, validateCreateNotes} from '../middlewares/validators/notesValidator.js';
const notesRouter = express.Router();

notesRouter.route('/').get(asyncWrapper(getNotes)).post(validateCreateNotes, asyncWrapper(createNote));
notesRouter.route('/:id').get(validateNotes, asyncWrapper(getNoteById)).patch([validateNotes, validateCreateNotes], asyncWrapper(updateExistingNote)).delete(validateNotes, asyncWrapper(deleteExistingNote));

export default notesRouter