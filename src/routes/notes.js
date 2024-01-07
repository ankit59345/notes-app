const express = require("express");
const {getNotes, getNoteById, createNote, updateExistingNote, deleteExistingNote} = require('../controllers/notesController.js');
const {validateNotes, validateCreateNotes} = require('../middlewares/validators/notesValidator.js');
const notesRouter = express.Router();
require("express-async-errors")

notesRouter.route('/').get(getNotes).post(validateCreateNotes, createNote);
notesRouter.route('/:id').get(validateNotes, getNoteById).patch([validateNotes, validateCreateNotes], updateExistingNote).delete(validateNotes, deleteExistingNote);

module.exports = notesRouter