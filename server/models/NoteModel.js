import mongoose from 'mongoose'
import NoteSchema from "../schemas/NoteShema"

const { model } = mongoose
const NoteModel = model('Note', NoteSchema)

export default NoteModel