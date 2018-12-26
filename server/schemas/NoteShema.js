import mongoose from 'mongoose'

const { Schema } = mongoose

const NoteSchema = new Schema({
    title: String,
    text: String
})


export default NoteSchema

