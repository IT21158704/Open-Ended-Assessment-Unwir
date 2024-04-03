import express from "express"
import { addNote, getNote, updateNote, deleteNote } from "../controllers/NoteController.js";

const NoteRouter = express.Router();

NoteRouter.get('/', getNote);
NoteRouter.post('/add', addNote);
NoteRouter.put('/update/:id', updateNote);
NoteRouter.delete('/delete/:id', deleteNote);

export default NoteRouter;