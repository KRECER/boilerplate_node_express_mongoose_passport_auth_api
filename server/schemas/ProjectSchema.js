import mongoose from 'mongoose'
const { Schema } = mongoose

const ProjectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    submitDate: {
        type: Date,
        required: true
    },
    submittedBy:{
        type: String,
        required: true
    }
})

export default ProjectSchema

