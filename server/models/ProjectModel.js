import mongoose from 'mongoose'

import ProjectSchema from "../schemas/ProjectSchema"

const { model } = mongoose

const ProjectModel = model('Project', ProjectSchema)

export default ProjectModel