import { Schema as _Schema, model } from 'mongoose';

const Schema = _Schema;

const noteSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    content : {
        type : String,
        required : true
    }
}, { timestamps: true });

const Note = model("Note",noteSchema);

export default Note;